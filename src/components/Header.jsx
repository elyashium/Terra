import React from 'react'
import { useNavigate } from 'react-router'
import '../app.css'


export default function Header() {

    const navigate = useNavigate();

    const home = () =>{
        navigate('./')
    }

    const learn = () =>{
        navigate('./Learn')
    }
    const Timeline = () =>{
        navigate('./Timeline')
    }
     const events = () =>{
        navigate('./Events')
    }


    return (
        <div className="header">
           <div onClick ={ home } >Home</div> 
            <div  onClick ={ learn } >Learn</div>
            <div  onClick ={ Timeline }  >Timeline</div>
            <div   onClick ={ events } >Events</div>
        </div>
    )
}
