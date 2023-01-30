import React from 'react'
import "./navbar.css"
export const Navbar = () => {
    return (
        
            <nav className="navbar">
                <a className="navbar-brand" href="/"><img className='logo' src="./kndmLogo.svg" width="128" height="41" alt="" /></a>
                    <ul className="nav justify-content-center">
                        <li className="nav-item">
                            <a className="nav-link" href="/inputdata">Input data</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/clientsdata">Clients Data  </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/runningcosts">Running costs data</a>
                        </li>
                    </ul>
            </nav>
      
    )
}
