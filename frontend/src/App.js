import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import './App.css';
import io from "socket.io-client";



//Component Imports
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import JoinChat from "./Pages/JoinChat Page/JoinChat";
import Home from "./Pages/Landing Page/Home"
import Dialogue from "./Pages/Dialogue Page/Dialogue";
import JoinChat2 from "./Pages/JoinChat Page/JoinChatButton"


//Socket connection
const socket = io.connect("http://localhost:4000", (error) => {
  if (error) {
    console.log("Socket connection error:", error);
  } else {
    console.log("Socket connected successfully!");
  }
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/joinchat',
    element: <JoinChat socket={socket}/>
  },
  {
    path: '/register',
    element: <RegisterPage/>
  },
  {
    path: '/dialogue',
    element: <Dialogue/>
  },
  {
    path: '/joinchat2',
    element: <JoinChat2/>
  },
  
])

function App() {
  return (
    <main>
      
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
}

export default App;
