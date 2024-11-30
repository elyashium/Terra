import React from 'react'
import { Element } from 'react-scroll'
import Header from './Header'
import Earth from './Earth'
import { useNavigate } from 'react-router-dom'
import CarbonCalculator from './CarbonCalculator'
import Timeline from './Timeline'
import '../app.css'

export default function Hero() {
  const navigate = useNavigate();

  const handleBtn = () => {
    navigate("/CarbonCalculator")
  }

  return (
    <>
      <Element name="home" className="main-content">
        <Header />

        <div className="firstContainer">
          <div className="text">
            <div className="title">terra.</div>

            <p>Use our interactive calculator to learn your carbon footprint and actions to take to reduce it.</p>

            <div onClick={handleBtn} className="tryit">
              <div className="btn">Try it out</div>
              <img src="src\images\arrow.svg" alt="" />
            </div>
          </div>

          <div className="earth">
            <Earth />
          </div>
        </div>
      </Element>

      <Element name="timeline" className="dark-mode-app">
        <Timeline />
      </Element>

      <Element name="learn" className="learn-section">
        {/* You can add a Learn section content here */}
        <h2>Learn More About Carbon Footprint</h2>
        {/* Add any learning resources or information */}
      </Element>

      <Element name="events" className="events-section">
        {/* You can add an Events section content here */}
        <h2>Environmental Events and Initiatives</h2>
        {/* Add any events or initiatives information */}
      </Element>
    </>
  )
}