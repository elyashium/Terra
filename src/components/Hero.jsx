import React from 'react'
import { useNavigate } from 'react-router-dom'
import Earth from './Earth'
import Timeline from './Timeline'
import Learn from './Learn'
import '../App.css'

export default function Hero() {
  const navigate = useNavigate();

  const handleBtn = () => {
    navigate("/CarbonCalculator")
  }

  return (
    <main className="hero-main">
      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="firstContainer">
          <div className="text">
            <div className="title">terra.</div>

            <p>Use our interactive calculator to learn your carbon footprint and actions to take to reduce it.</p>

            <div onClick={handleBtn} className="tryit">
              <div className="btn">Try it out</div>
              <img src="/src/images/arrow.svg" alt="Arrow" />
            </div>
          </div>

          <div className="earth">
            <Earth />
          </div>
        </div>
      </section>
      
      {/* Timeline Section */}
      <section id="timeline" className="section-container dark-mode-app">
        <div className="section-wrapper">
          <Timeline />
        </div>
      </section>
      
      {/* Learn Section */}
      <section id="learn" className="section-container learn-section">
        <div className="section-wrapper">
          <Learn />
        </div>
      </section>
      
      {/* Events Section */}
      <section id="events" className="section-container events-section">
        <div className="coming-soon">
          <h2>Events Coming Soon</h2>
          <p>Stay tuned for upcoming events and activities!</p>
        </div>
      </section>
    </main>
  )
}