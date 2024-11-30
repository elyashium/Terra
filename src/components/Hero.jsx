import React from 'react'
import Header from './Header'
import Earth from './Earth'
import {useNavigate} from 'react-router-dom'
import CarbonCalculator from './CarbonCalculator'
import Timeline from './Timeline'
import '../app.css'

export default function Hero() {

    const navigate = useNavigate();

    const handleBtn = () =>{
        navigate("/CarbonCalculator")
    }

  return (
    <>
    <main>

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




   
      
    </main>

  </>
  )
}
