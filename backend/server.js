const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const errorMiddleware = require("./middleware/error");
const http = require("http")
const {Server} = require("socket.io")
const dotenv = require("dotenv");
const Event =  require("../event")
const connectDataBase = require("./config/database");
const { userJoin, getUsers, userLeave } = require("./utils/user");


const app = express();
app.use(cors())
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const server = http.createServer(app)


//Config
dotenv.config({ path: "./config/config.env" });

//Connecting to database
connectDataBase();


const io = new Server(server, {
  cors: {
      origin: "http://localhost:3000",
      methods: ["GET","POST", "PUT", "DELETE"]
  }
})







//Route Imports
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes")
const roomRoutes  = require("./routes/roomRoutes")



app.use("/api/v1", userRoutes);
app.use("/api/v1", messageRoutes);
app.use("/api/v1",roomRoutes)








// MiddleWare for Error
app.use(errorMiddleware);


//Handling Uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught exception`);
  process.exit(1);
});



//Socket Connections
let imageUrl, userRoom;
io.on(Event.CONNECTION, (socket)=>{
  console.log(`User connected id: ${socket.id}`);

  socket.on(Event.JOIN_ROOM, (data)=>{
      socket.join(data);
      console.log(`User with ID: ${socket.id} joined room: ${data}`);
  })
  
  socket.on(Event.SEND_MESSAGE, (data)=>{
      socket.to(data.room).emit(Event.RECEIVE_MESSAGE, data)
  })

  socket.on(Event.USER_JOINED, (data) => {
    const { roomId, userId, userName, host, presenter } = data;
    userRoom = roomId;
    const user = userJoin(socket.id, userName, roomId, host, presenter);
    const roomUsers = getUsers(user.room);
    socket.join(user.room);
    socket.emit(Event.MESSAGE, {
      message: "Welcome to ChatRoom",
    });
    socket.broadcast.to(user.room).emit(Event.MESSAGE, {
      message: `${user.username} has joined`,
    });

    io.to(user.room).emit(Event.USERS, roomUsers);
    io.to(user.room).emit(Event.CANVAS_IMAGE, imageUrl);
  });

  socket.on(Event.DRAWING, (data) => {
    imageUrl = data;
    socket.broadcast.to(userRoom).emit(Event.CANVAS_IMAGE, imageUrl);
  });



  socket.on(Event.DISCONNECT,()=>{
      console.log(`User disconnected id: ${socket.id}`);
      const userLeaves = userLeave(socket.id);
    const roomUsers = getUsers(userRoom);

    if (userLeaves) {
      io.to(userLeaves.room).emit(Event.MESSAGE, {
        message: `${userLeaves.username} left the chat`,
      });
      io.to(userLeaves.room).emit(Event.USERS, roomUsers);
    }
  })
})




server.listen(process.env.PORT, () => {
  console.log(`Server is running in http://localhost:${process.env.PORT}`);
});

//Unhandled Promise rejections
//This may occur if we miss handle the connection strings

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise rejections`);

  server.close(() => {
    process.exit(1);
  });
});
