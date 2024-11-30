import React from 'react'
import { Link } from 'react-scroll'
import '../app.css'

export default function Header() {
  return (
    <header className="header">
      <nav>
        <Link 
          to="home" 
          smooth={true} 
          duration={500} 
          offset={-70}
          className="nav-link"
        >
          Home
        </Link>
        <Link 
          to="timeline" 
          smooth={true} 
          duration={500} 
          offset={-70}
          className="nav-link"
        >
          Timeline
        </Link>
        <Link 
          to="learn" 
          smooth={true} 
          duration={500} 
          offset={-70}
          className="nav-link"
        >
          Learn
        </Link>
        <Link 
          to="events" 
          smooth={true} 
          duration={500} 
          offset={-70}
          className="nav-link"
        >
          Events
        </Link>
      </nav>
    </header>
  )
}