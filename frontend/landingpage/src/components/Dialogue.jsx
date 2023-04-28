import React, { useEffect } from 'react'
import '../Style/Dialogue.css'
import { Link } from 'react-router-dom'

const Dialogue = () => {
  useEffect(() => {
    setTimeout(function() {
      document.querySelector(".popupD").style.display = "block";
    }, 2000);

    document.querySelector("#close").addEventListener("click", function() {
      document.querySelector(".popupD").style.display = "none";
    });
  }, []);

  return (
    <div className="popupD">
      <button className="X" id="close">&times;</button>
      <h2 className="Headdingcard">🖐️Welcome to our site</h2>
      <p className="PP">
        We're working hard to get our site ready for everyone! While we wrap up the finishing touches, we're adding people gradually to make sure nothing breaks :)
      </p>
      <Link to="/" className="GetUserName"> Get Your Username &#8594;</Link>
    </div>
  )
}

export default Dialogue