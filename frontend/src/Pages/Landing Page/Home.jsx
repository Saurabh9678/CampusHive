import React from 'react'
import "./Home.css"
import NavBar from "../../components/NavBar"
import {Link} from "react-router-dom";
const Home = () => {
  return (
    <>
    <NavBar title="CampusHive" />
   <div className="container">
    <div className="box">
      <div className="font1">Discover New Peoples</div>
      <div className="font2">Connect, Play, Talk
      </div>
      <div className="font3">All in one place </div>

      <Link to="/register" class="button">SIGNUP</Link>
    </div>
   </div>
   </>
  )
}

export default Home
