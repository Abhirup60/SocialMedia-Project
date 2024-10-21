// SplashScreen.js
import React, { useEffect, useState } from 'react';
import './splash.css';
import Connect from '../assets/connect.png';

const SplashScreen = ({ onComplete }) => {
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // Timer to trigger the completion after the animation ends
    const timer = setTimeout(() => {
      setAnimationComplete(true);
      onComplete(); // Callback to remove the splash screen
    }, 5000); // Adjust duration based on the animations

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`splash-screen ${animationComplete ? 'fade-out' : ''}`}>
      <div className="logo-container">
        <div className="circle-background"></div>
        <h1 className="logo">Connectly</h1>
        <p className="tagline">Connect the world.</p>
      </div>
    </div>
  );
};

export default SplashScreen;
