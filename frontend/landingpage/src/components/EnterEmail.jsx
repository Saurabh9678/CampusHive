import React from 'react'
import "../Style/EnterPhoneNo.css"
import { Link } from 'react-router-dom'
import img4 from '../Images/phone.png'
import img5 from '../Images/email.png'

const EnterEmail = () => {
  return (
    <>
    <Link to="/EnterPhoneNo" className="Phoneicon"><img src={img4} alt="" className="Phoneimage"/></Link>
    <Link to="/EnterEmail" className="Emailicon"><img src={img5} alt="" className="Emailimage"/></Link>


    <div className="firstBox">
        
         <button className="X" id="close">&times;</button>
      <h2 className="PhoneNoHead">✉️Enter your Email Id</h2>  
      <form>
        <label>
            <input
            id="email"
            type="text"
            required
            placeholder="site@mail.com"/>
        </label>
      </form>
      <Link to="/" className="Next">Next &#8594;</Link>
      <p className="ThankYou">By entering your Email, you’re agreeing to our Terms of Service and Privacy Policy. Thanks!</p>
    </div>
    
    </>
  )
}

  

export default EnterEmail
