import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export class Sidebar extends Component {
    render() {
        return (
            <div>
                <ul className="nav arcade-sidebar-nav flex-column">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/home/overview" activeClassName="nav-link active">Overview</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/home/progress" activeClassName="nav-link active">Progress</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/home/friends" activeClassName="nav-link active">Friends</NavLink>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Sidebar
