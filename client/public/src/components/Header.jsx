import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    
    useEffect(() => {
        const checkLoginStatus = () => {
            const user = localStorage.getItem('terraUser');
            setIsLoggedIn(!!user);
        };
        
        checkLoginStatus();
        
        // Add event listener for storage changes
        window.addEventListener('storage', checkLoginStatus);
        
        return () => {
            window.removeEventListener('storage', checkLoginStatus);
        };
    }, []);
    
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    
    // Don't render the header on the CarbonCalculator page
    if (location.pathname === '/CarbonCalculator') {
        return null;
    }
    
    const scrollToSection = (id) => {
        setMenuOpen(false);
        
        if (location.pathname !== '/') {
            navigate('/');
            // Allow time for navigation before scrolling
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        } else {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };
    
    return (
        <header className="header">
            <div className="logo">
                <a href="#home" onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('home');
                }}>
                    <img src="/src/images/logo.png" alt="Terra Logo" />
                </a>
            </div>
            
            <div className="mobile-menu-icon" onClick={toggleMenu}>
                <div className={`menu-icon ${menuOpen ? 'open' : ''}`}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            
            <nav className={`nav-links ${menuOpen ? 'active' : ''}`}>
                <a href="#home" className="nav-link" onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('home');
                }}>
                    Home
                </a>
                <a href="#timeline" className="nav-link" onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('timeline');
                }}>
                    Timeline
                </a>
                <a href="#learn" className="nav-link" onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('learn');
                }}>
                    Learn
                </a>
                <a href="#events" className="nav-link" onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('events');
                }}>
                    Events
                </a>
                
                {isLoggedIn ? (
                    <>
                        <a href="/profile" className="nav-link" onClick={(e) => {
                            e.preventDefault();
                            navigate('/profile');
                            setMenuOpen(false);
                        }}>
                            My Profile
                        </a>
                        <a href="/CarbonCalculator" className="nav-link" onClick={(e) => {
                            e.preventDefault();
                            navigate('/CarbonCalculator');
                            setMenuOpen(false);
                        }}>
                            Calculator
                        </a>
                    </>
                ) : (
                    <a href="/auth" className="nav-link" onClick={(e) => {
                        e.preventDefault();
                        navigate('/auth');
                        setMenuOpen(false);
                    }}>
                        Login / Sign Up
                    </a>
                )}
            </nav>
        </header>
    );
}