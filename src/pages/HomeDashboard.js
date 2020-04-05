import React, { Component } from 'react'
import { Switch, Route, Redirect, Link } from 'react-router-dom'
import Changelog from './Changelog'
import packageJSON from '../../package.json'
import Highscores from '../components/Highscores'
import $ from 'jquery'

export class HomeDashboard extends Component {

    loginAction = () => {
        if (this.props.guestMode) {
            window.location.href = "http://legendword.com/login?from=http://legendword.com/arcade";
        }
        else {
            $.post("http://legendword.com/user_system/logout.php",{},(t)=>{
                this.props.logOut()
            });
        }
    }

    newAccount = () => {
        window.location.href = "http://legendword.com/register"
    }

    render() {
        return (
            <Switch>
                <Route path="/home/changelog">
                    <Changelog />
                </Route>
                <Route path="/home/friends">
                    <div className="container">
                        <p>Friends Tab coming soon!</p>
                    </div>
                </Route>
                <Route path="/home/progress">
                    <div className="container">
                        <p>Progress Tab coming soon!</p>
                    </div>
                </Route>
                <Route path="/home/overview">
                    <div className="container arcade-dashboard-container">
                        <div className="row">
                            <div className="col">
                                <div className="card arcade-dashboard-card">
                                    <h3 className="arcade-dashboard-title">{this.props.user.name}</h3>
                                    <div className="arcade-dashboard-userlvl">
                                        <span>LV. {this.props.user.level} - {this.props.user.levelexp}/{this.props.user.levelupexp}</span>
                                        <div className="progress" style={{height:"2px"}}>
                                            <div className="progress-bar" style={{width:(this.props.user.levelexp/this.props.user.levelupexp)*100+"%"}}></div>
                                        </div>
                                    </div>
                                    <div className="arcade-dashboard-useraction">
                                        <button className="btn arcade-btn-blue" style={{marginRight: "1rem", marginBottom: "0.5rem"}} onClick={this.loginAction}>{this.props.guestMode?"Sign In":"Sign Out"}</button>
                                        {
                                            this.props.guestMode ? (<button className="btn arcade-btn-blue" style={{marginBottom: "0.5rem"}} onClick={this.newAccount}>Create Account</button>) : null
                                        }
                                    </div>
                                </div>
                                <div className="arcade-dashboard-goPlay card arcade-dashboard-card">
                                    <Link to="/play" className="btn arcade-btn-lgNav">SINGLEPLAYER</Link>
                                    <Link to="/play" className="btn arcade-btn-lgNav">MULTIPLAYER</Link>
                                </div>
                            </div>
                            <div className="col">
                                <h5 style={{marginTop: "max(2vh,10px)",color: "#e48d1f"}}>Legendword Arcade Insiders Beta {packageJSON?packageJSON.version:""}</h5>
                                <p style={{color: "#e48d1f"}}>Submit Issues through <a href="https://github.com/legendword/arcade/issues">the GitHub Repo</a>.</p>
                                <div className="arcade-dashboard-highscore card arcade-dashboard-card">
                                    <h4>High Scores</h4>
                                    <Highscores highscore={this.props.highscore} />
                                </div>
                                <div className="arcade-dashboard-friends card arcade-dashboard-card">
                                    <h4>Friends</h4>
                                    <p>No Records</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Route>
                <Route path="/home">
                    <Redirect to="/home/overview" />
                </Route>
            </Switch>
        )
    }
}

export default HomeDashboard
