// import Slider from './components/Slider';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Hero from './components/Hero';
import CarbonCalculator from './components/CarbonCalculator';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/CarbonCalculator" element={<CarbonCalculator />} />
      </Routes>
    </Router>
  )
}

export default App
