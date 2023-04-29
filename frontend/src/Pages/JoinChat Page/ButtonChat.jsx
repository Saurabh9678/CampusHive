import React from 'react'
import '../JoinChat Page/ButtonChat.css'
import { Link } from 'react-router-dom'
const ButtonChat = ({children, ...props}) => {
  return (
    <Link {...props} className="button1bouncy">{children}</Link>
  )
}

export default ButtonChat