import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css";
import img1 from '../../Images/fb.png';
import img2 from '../../Images/gp.png';
import img3 from '../../Images/tw.png';

import { API, PATH } from "../../common/network";

const RegisterPage = () => {

  const navigate = useNavigate()

  const [name, setname] = useState()
  const [college, setcollege] = useState()
  const [password, setpassword] = useState()
  const [userId, setuserId] = useState()
  const [email, setemail] = useState()
  // const [name, setname] = useState()
  // const [name, setname] = useState()

  const [loginLeft, setLoginLeft] = useState("50px");
  const [registerLeft, setRegisterLeft] = useState("-400px");
  const [btnColorLeft, setBtnColorLeft] = useState("0px");

  function handleRegister() {
    setLoginLeft("-400px");
    setRegisterLeft("50px");
    setBtnColorLeft("110px");
  }

  function handleLogin() {
    setLoginLeft("50px");
    setRegisterLeft("450px");
    setBtnColorLeft("0px");
  }


  function registerUser() {
    const postData = {
      name: name,
      college: college,
      username: userId,
      email: email,
      password: password
    }
    API.post(PATH.User.SaveUser, postData).then((res) => {
      localStorage.setItem('token', res.token)
      localStorage.setItem('username', res.user.username)
      localStorage.setItem('user', res.user)
      navigate('/dialogue')
    }
    )
  }


  function loginUser() {
    const postData = {
      email: email,
      password: password
    }
    API.post(PATH.User.GetUser, postData).then((res) => {
      localStorage.setItem('token', res.token)
      localStorage.setItem('username', res.user.username)
      localStorage.setItem('user', res.user)
      navigate('/dialogue')
    }
    )
  }



  return (
    <div className="Hero">
      <div className="Sidebox"></div>
      <div className="FromBox">
        <div className="button-box">
          <div id="btnColor" style={{ left: btnColorLeft }}></div>
          <button className="toggleLogin" onClick={handleLogin}>Login</button>
          <button className="toggleLogin" onClick={handleRegister}>Register</button>
        </div>
        <div className="SocailIcons">
          <img src={img1} alt="" />
          <img src={img2} alt="" />
          <img src={img3} alt="" />
        </div>
        <form id="loginF" className="inputs-grp" style={{ left: loginLeft }}>
        <input onChange={(e) => setemail(e.target.value)} type="email" className="inputfield" placeholder="Email Id" value={email} required />
          <input onChange={(e) => setpassword(e.target.value)} type="password" className="inputfield" placeholder="Enter Password" value={password} required />
          <label>
            <input type="checkbox" className="Check_box" />
            <span className="span">Remember Password</span>
          </label>
          <button type="button" className="SubmitBtn" onClick={() => loginUser()}>Login</button>
        </form>
        <form id="registerR" className="inputs-grp" style={{ left: registerLeft }}>
          <input onChange={(e) => setname(e.target.value)} type="text" className="inputfield" placeholder="Name" value={name} required />
          <input onChange={(e) => setcollege(e.target.value)} type="text" className="inputfield" placeholder="College" value={college} required />
          <input onChange={(e) => setuserId(e.target.value)} type="text" className="inputfield" placeholder="User Id" value={userId} required />
          <input onChange={(e) => setemail(e.target.value)} type="email" className="inputfield" placeholder="Email Id" value={email} required />
          <input onChange={(e) => setpassword(e.target.value)} type="password" className="inputfield" placeholder="Enter Password" value={password} required />
          {/* <label>
            <input type="checkbox" className="Check_box" />
            <span className="span">i agree to the terms and conditions</span>
          </label> */}

          <button type="button" className="SubmitBtn" onClick={() => registerUser()}>Register</button>

          {/* <Link to="/EnterPhoneNo" type="submit" className="SubmitBtn">Register</Link> */}
        </form>
      </div>

    </div>
  );
};

export default RegisterPage;