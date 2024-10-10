import Earth from './components/Earth'; 
import './App.css'

function App() {
  return (
    <>
    <main>
      <header>

      </header>

      <div className="container">

        <div className="text">

          <div className="title">Terra</div>
          
          <p>Use our interactive calculator to learn your carbon footprint and actions to take to reduce it.</p>

          <div className="btn"> 
          <img src="./assets/try.svg" alt="" />
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

export default App
