import React from 'react'
import { useNavigate } from 'react-router'
import '../app.css'


export default function Header() {

    const home = () => {
        navigate('/'); 
    };

    const learn = () => {
        navigate('/learn'); 
    };

    const timeline = () => {
        navigate('/timeline'); 
    };

    const events = () => {
        navigate('/events'); 
    };


    return (
        <div className="header">
            <div onClick={home} >Home</div>
            <div onClick={learn} >Learn</div>
            <div onClick={timeline}  >Timeline</div>
            <div onClick={events} >Events</div>
        </div>
    )
}
