import React from 'react'
import '../Style/Otp.css'
import { Link } from 'react-router-dom'
const Otp = () => {
  return (
    <div className="otp_card">
        <h2 className="OTPhead">🔒Enter the code we just texted you </h2>
        <dic className="otp_card_input">
            <label>
                <input className="V" type="text" maxLength="1" autoFocus/>
                <input className="V" type="text" maxLength="1"/>
                <input className="V" type="text" maxLength="1"/>
                <input className="V" type="text" maxLength="1"/>
            </label>
        </dic>
        <p className="code">didn't receive the code?<Link to="/"> Tap to resend</Link></p>
        <button  className="Verify"disabled>Verify</button>
      
    </div>
  )
}

export default Otp
