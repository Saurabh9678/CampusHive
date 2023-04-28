import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import './App.css';
import io from "socket.io-client";



//Component Imports
import JoinChat from "./Pages/JoinChat";


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
    element: <JoinChat socket={socket}/>
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
