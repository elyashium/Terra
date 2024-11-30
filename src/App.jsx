
// import Slider from './components/Slider';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Hero from './components/Hero';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        {/* <Route path ="/" element ={<Auth />} /> */}
      </Routes>
    </Router>
  )
}

export default App
