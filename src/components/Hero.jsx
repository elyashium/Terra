import React from 'react'
import { Element } from 'react-scroll'
import Header from './Header'
import Earth from './Earth'
import { useNavigate } from 'react-router-dom'
import CarbonCalculator from './CarbonCalculator'
import Timeline from './Timeline'
import '../app.css'
import Learn from './Learn'

export default function Hero() {
  const navigate = useNavigate();

  const handleBtn = () => {
    navigate("/CarbonCalculator")
  }

  return (
    <>
      <Header />
      <main>
        <Element name="home">


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
          <Learn />
        </Element>

        <Element name="events" className="events-section" style={{ display: 'none' }}>
          {/* Placeholder for events section */}
        </Element>
      </main>
    </>
  )
}