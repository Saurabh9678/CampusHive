import React, { useState } from "react";
import {Link} from "react-router-dom";
import "../Style/Registerpage.css"; 
import img1 from '../Images/fb.png';
import img2 from '../Images/gp.png';
import img3 from '../Images/tw.png';

const Registerpage = () => {
    const [loginLeft, setLoginLeft] = useState("50px");
    const [registerLeft, setRegisterLeft] = useState("-400px");
    const [btnColorLeft, setBtnColorLeft] = useState("0px");

    function handleRegister(){
        setLoginLeft("-400px");
        setRegisterLeft("50px");
        setBtnColorLeft("110px");
    }

    function handleLogin(){
        setLoginLeft("50px");
        setRegisterLeft("450px");
        setBtnColorLeft("0px");
    }

  return (
    <div className="Hero">
        <div className="Sidebox"></div>
      <div className="FromBox">
        <div className="button-box">
          <div id="btnColor" style={{left: btnColorLeft}}></div>
          <button className="toggleLogin" onClick={handleLogin}>Login</button>
          <button className="toggleLogin" onClick={handleRegister}>Register</button>
        </div>
        <div className="SocailIcons">
          <img src={img1} alt=""/>
          <img src={img2} alt=""/>
          <img src={img3} alt=""/>
        </div>
        <form id="loginF" className="inputs-grp" style={{left: loginLeft}}>
          <input type="text" className="inputfield" placeholder="User Id" required />
          <input type="text" className="inputfield" placeholder="Enter Password" required />
          <label>
            <input type="checkbox" className="Check_box" />
            <span className="span">Remember Password</span>
          </label>
          <Link to="/Dialogue" type="submit" className="SubmitBtn">Login</Link>
        </form>
        <form id="registerR" className="inputs-grp" style={{left: registerLeft}}>
          <input type="text" className="inputfield" placeholder="User Id" required />
          <input type="email" className="inputfield" placeholder="Email Id" required />
          <input type="text" className="inputfield" placeholder="Enter Password" required />
          <label>
            <input type="checkbox" className="Check_box" />
            <span className="span">i agree to the terms and conditions</span>
          </label>
          <Link to="/EnterPhoneNo" type="submit" className="SubmitBtn">Register</Link>
        </form>
      </div>
      
    </div>
  );
};

export default Registerpage;