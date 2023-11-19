import React from 'react'
import { Link } from 'react-router-dom'
// import './Homepage.css';
const Homepage = () => {
  return (
    <div id='home'>
      <h1>COMIC CREATOR APP</h1> 
      <div>
        <Link to='/comic-form'><button>Click Here To Create Your Comic</button></Link>
        

        
      </div>
    </div>
  )
}

export default Homepage
