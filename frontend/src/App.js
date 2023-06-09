import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import './App.css';
import io from "socket.io-client";



//Component Imports
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import JoinChat from "./Pages/JoinChat Page/JoinChat";
import Home from "./Pages/Landing Page/Home"
import Dialogue from "./Pages/Dialogue Page/Dialogue";
import ConnectCanvas from "./Pages/Canvas Page/ConnectCanvas";

//Socket connection
const server = "http://localhost:4000"
const connectionOptions = {
  "force new connection": true,
  reconnectionAttempts: "Infinity",
  timeout: 10000,
  transports: ["websocket"],
};
const socket = io(server, connectionOptions);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/joinchat',
    element: <JoinChat socket={socket} />
  },
  {
    path: '/register',
    element: <RegisterPage />
  },
  {
    path: '/dialogue',
    element: <Dialogue />
  },
  {
    path: '/canvas',
    element: <ConnectCanvas socket={socket}/>
  }

])

function App() {
  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
}

export default App;
