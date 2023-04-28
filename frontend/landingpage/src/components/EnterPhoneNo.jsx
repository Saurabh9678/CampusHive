import React from 'react'
import "../Style/EnterPhoneNo.css"
import { Link } from 'react-router-dom'
import img4 from '../Images/phone.png'
import img5 from '../Images/email.png'
const EnterPhoneNo = () => {
  return (

    <>
    <Link to="/EnterPhoneNo" className="Phoneicon"><img src={img4} alt="" className="Phoneimage"/></Link>
    <Link to="/EnterEmail" className="Emailicon"><img src={img5} alt="" className="Emailimage"/></Link>


    <div className="firstBox">
        
         <button className="X" id="close">&times;</button>
         
      <h2 className="PhoneNoHead">☎️Enter your phone number</h2>  
      <form>
        <label>
            <input
            id="phone"
            type="tel"
            required
            pattern="[0]{1}[0-9]{10}"
            placeholder="+91-1234567890"/>
        </label>
      </form>
      <Link to="/otppage" className="Next">Next &#8594;</Link>
      <p className="ThankYou">By entering your number, you're agreeing to our Terms of Service and Privacy Policy. Thanks!</p>
    </div>
    
    </>
  )
}

export default EnterPhoneNo
