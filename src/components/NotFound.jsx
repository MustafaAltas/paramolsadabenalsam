import React from 'react'
import NotFoundImage from "../assets/notfound.png"
function NotFound() {
  return (
    <div style={{width:"100vw",height:"100vh",padding:"5rem"}}>
      <img src={NotFoundImage} alt="" />
    </div>
  )
}

export default NotFound
