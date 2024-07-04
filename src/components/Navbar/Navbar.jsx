import React from 'react'
import './Navbar.css'

function Navbar() {
  return (
    <div className='navbar'>
      <h1>Portfolio</h1>
      <ul className="menu">
          <li><a href="/">Home</a></li>
          <li><a href="/blogs">Blogs</a></li>
          <li><a href="/portfolio">Portfolio</a></li>
          <li><a href="/about">About me</a></li>
          <li><a href="/contact">Contact</a></li>
      </ul>
    </div>
  )
}

export default Navbar