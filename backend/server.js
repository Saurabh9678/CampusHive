const app = require("./app");
const dotenv = require("dotenv");
const server = require("http").createServer(app)
const {Server} = require("socket.io")
const Event =  require("../event")
const connectDataBase = require("./config/database");

//Handling Uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught exception`);
  process.exit(1);
});

//Config
dotenv.config({ path: "./config/config.env" });

//Connecting to database
connectDataBase();

const io = new Server(server)

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
