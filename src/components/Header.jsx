import React from 'react'
import { Link } from 'react-scroll'
import '../app.css'

export default function Header() {
    return (
        <header className="header">
            <Link
                to="home"
                smooth={true}
                duration={500}
                offset={-70}
                className="nav-link"
            >

                <div className="logo">
                    <img src="src\images\logo.png" alt="" />
                </div>
            </Link>
            <div>

                <Link
                    to="home"
                    smooth={true}
                    duration={500}
                    offset={-70}
                    className="nav-link"
                >
                    Home
                </Link>

            </div>

            <div >

                <Link
                    to="timeline"
                    smooth={true}
                    duration={500}
                    offset={-70}
                    className="nav-link"
                >
                    Timeline
                </Link>

            </div>


            <div>

                <Link
                    to="learn"
                    smooth={true}
                    duration={500}
                    offset={-70}
                    className="nav-link"
                >
                    Learn
                </Link>
            </div>

            <div>


                <Link
                    to="events"
                    smooth={true}
                    duration={500}
                    offset={-70}
                    className="nav-link"
                >
                    Events
                </Link>
            </div>


        </header>
    )
}