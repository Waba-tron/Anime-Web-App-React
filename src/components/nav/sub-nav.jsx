import React from 'react'
import {NavLink} from 'react-router-dom';
import '../../components/nav/sub-nav.css';
export default function SubNav({id}) {
    return (
        <div>
            <nav className="sub-nav">
                <ul className="sub-links">
                    <NavLink activeClassName="current-link" to={`${id}/summary`} className="sub-link link">Summary</NavLink>
              
                    <NavLink activeClassName="current-link" to={`${id}/episodes`} className="sub-link link">Episodes</NavLink>
                </ul> 
            </nav>
        </div>
    )
}
