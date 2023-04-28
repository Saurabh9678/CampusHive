const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const errorMiddleware = require("./middleware/error");
const http = require("http")
const {Server} = require("socket.io")
const dotenv = require("dotenv");
const Event =  require("../event")
const connectDataBase = require("./config/database");



const app = express();
app.use(cors())
app.use(express.json());
app.use(cookieParser());


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

app.use("/api/v1", userRoutes);

// MiddleWare for Error
app.use(errorMiddleware);


//Handling Uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught exception`);
  process.exit(1);
});



//Socket Connections
io.on(Event.CONNECTION, (socket)=>{
  console.log(`User connected id: ${socket.id}`);

  socket.on(Event.JOIN_ROOM, (data)=>{
      socket.join(data);
      console.log(`User with ID: ${socket.id} joined room: ${data}`);
  })
  
  socket.on(Event.SEND_MESSAGE, (data)=>{
      socket.to(data.room).emit("receive_message", data)
  })

  socket.on(Event.DISCONNECT,()=>{
      console.log(`User disconnected id: ${socket.id}`);
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
