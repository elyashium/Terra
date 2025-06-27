// import Slider from './components/Slider';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Hero from './components/Hero';
// import Learn from './components/Learn';
// import Events from './components/Events';
// import Timeline from './components/Timeline';
import CarbonCalculator from './components/CarbonCalculator';
import ChakraTest from './components/ChakraTest';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        {/* <Route path ="/" element ={<Auth />} /> */}
        {/* <Route path="/timeline" element={<Timeline />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/events" element={<Events />} /> */}
         <Route path="/CarbonCalculator" element={<CarbonCalculator />} />
         <Route path="/chakra-test" element={<ChakraTest />} />
      </Routes>
    </Router>
  )
}

export default App
