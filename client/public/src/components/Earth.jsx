import React, { useState, useEffect } from 'react';
import Spline from '@splinetool/react-spline';
import '../App.css';

export default function Earth() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);

    // Clean up
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Don't render on mobile devices
  if (isMobile) {
    return null;
  }

  return (
    <Spline
      scene="https://prod.spline.design/cgLfXI65KbWO2upw/scene.splinecode"
      className="earth-spline"
    />
  );
}
