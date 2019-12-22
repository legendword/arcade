import React, { Component } from 'react'
import { Switch, Route, Redirect, Link } from 'react-router-dom'
import Changelog from './Changelog'
import packageJSON from '../../package.json'
import Highscores from '../components/Highscores'

export class HomeDashboard extends Component {
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
                        <h2 className="arcade-dashboard-title">{this.props.user.name}</h2>
                        <div className="arcade-dashboard-userlvl">
                            <span>LV. {this.props.user.level} - {this.props.user.levelexp}/{this.props.user.levelupexp}</span>
                            <div className="progress" style={{height:"2px"}}>
                                <div className="progress-bar" style={{width:(this.props.user.levelexp/this.props.user.levelupexp)*100+"%"}}></div>
                            </div>
                        </div>
                        <div className="arcade-dashboard-goPlay">
                            <Link to="/play" className="btn arcade-btn-blue" style={{width:"5rem"}}>Play</Link>
                        </div>
                        <h5 style={{marginTop: "max(2vh,10px)",color: "#e48d1f"}}>Legendword Arcade Insiders Beta {packageJSON?packageJSON.version:""}</h5>
                        <p style={{color: "#e48d1f"}}>Submit Issues through <a href="https://github.com/legendword/arcade/issues">the GitHub Repo</a>.</p>
                        <div className="row" style={{marginTop: "max(4vh,20px)"}}>
                            <div className="col-md-7">
                                <div className="arcade-dashboard-highscore">
                                    <h4>High Scores</h4>
                                    <Highscores highscore={this.props.highscore} />
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="arcade-dashboard-friends">
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
