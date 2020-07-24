import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export class Header extends Component {
    goHome = (e) => {
        if (this.props.inGame) {
            if (!window.confirm("You're now leaving an ongoing game. Your progress won't be saved.")) {
                e.preventDefault()
            }
        }
    }

    playClick = () => {
        if (this.props.inGame) {
            if (!window.confirm("You're now leaving an ongoing game. Your progress won't be saved.")) {
                return
            }
        }
        this.props.leaveGame()
    }

    render() {
        return (
            <div className="container-fluid" style={{paddingTop:"56px"}}>
                <nav className="arcade-header-nav navbar lnav fixed-top navbar-expand-lg navbar-light">

                    <a className="arcade-header-brand navbar-brand" href="http://legendword.com/arcade">Legendword Arcade</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="arcade-header-content collapse navbar-collapse justify-content-between" id="navbarContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <NavLink className="arcade-header-link nav-link" to="/home" activeClassName="arcade-header-link nav-link active" onClick={this.goHome}>Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="arcade-header-link nav-link" to="/play" activeClassName="arcade-header-link nav-link active" onClick={this.playClick}>Play</NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Header
