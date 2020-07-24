import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../css/Home.Dashboard.css'
import packageJSON from '../../package.json'
import Highscores from '../components/Highscores'

export class HomeDashboard extends Component {

    render() {
        return (
            <div className="arcade-dashboard-container">
                <div className="row" style={{height:"100%"}}>
                    <div className="col-8 arcade-dashboard-main">
                        <h4 style={{marginTop: "max(2vh,10px)"}}>Legendword Arcade Insiders Beta {packageJSON?packageJSON.version:""}</h4>
                        <p>Submit Issues through <a href="https://github.com/legendword/arcade/issues">the GitHub Repo</a>.</p>
                        <div className="arcade-dashboard-goPlay">
                            <Link to="/play" className="arcade-btn-lgNav">SINGLEPLAYER</Link>
                            <Link to="/play" className="arcade-btn-lgNav">MULTIPLAYER (upcoming)</Link>
                        </div>
                    </div>
                    <div className="col arcade-dashboard-side">
                        <div className="arcade-dashboard-card">
                            <h3 className="arcade-dashboard-title">{this.props.user.name}</h3>
                            <div className="arcade-dashboard-userlvl">
                                <span>LV. {this.props.user.level} - {this.props.user.levelexp}/{this.props.user.levelupexp}</span>
                                <div className="progress" style={{height:"2px"}}>
                                    <div className="progress-bar" style={{width:(this.props.user.levelexp/this.props.user.levelupexp)*100+"%"}}></div>
                                </div>
                            </div>
                            <div className="arcade-dashboard-useraction">
                                <button className="arcade-btn-block btn-dark" onClick={this.loginAction}>{this.props.guestMode?"Sign In":"Sign Out"}</button>
                                {
                                    this.props.guestMode ? (<button className="arcade-btn-block btn-light" onClick={this.newAccount}>Create Account</button>) : null
                                }
                            </div>
                        </div>
                        <div className="arcade-dashboard-friends arcade-dashboard-card">
                            <h5>Friends</h5>
                            <p>No Records</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomeDashboard
