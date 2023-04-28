import React,  { useState } from 'react';
import {Link} from "react-router-dom";
import "../Style/NavBar.css";

const NavBar = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <div className="header">
      <div className="navbar">
        <div className="logo">
          <Link to="/">{props.title}</Link>
        </div>
        <ul className="NavIteams">
          <li className="Home">
            <Link to="/">
            Home</Link>
          </li>
          <li className="about">
            <Link to="/about">
            About</Link>
          </li>
          <li className="contact">
            <Link to="/Contact">
            Contact</Link>
          </li>
        </ul>

        <Link to="/" className="action-btn">
          CONNECT
        </Link>
        <div className="toggle_btn" onClick={handleToggleMenu}>
          <i className="fa-solid fa-bars"></i>
        </div>

        <div className={isMenuOpen ? "dropdown_menu open" : "dropdown_menu"}>
          <li>
            <Link to="/">
            Home</Link>
          </li>
          <li>
            <Link to="/about">
            About</Link>
          </li>
          <li>
            <Link to="/Contact">
            Contact</Link>
          </li>
          <li>
            <Link to="/Profile">
            Profile</Link>
          </li>
          <li> 
            <Link to="/" className="action-btn2">
              CONNECT
            </Link>
          </li>
        </div>
        
      </div>
    </div>
  )
}

export default NavBar;
