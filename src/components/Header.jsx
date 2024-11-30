import React from 'react'
import { useNavigate } from 'react-router'

export default function Header() {

    const navigate = useNavigate();

    

    return (
        <div className="header">
           <div className="home">Home</div> 
            <div className="learn">Learn</div>
            <div className="timeline">Timeline</div>
            <div className="events">Events</div>
        </div>
    )
}
