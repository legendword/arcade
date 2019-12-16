import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

export class HomeDashboard extends Component {
    render() {
        return (
            <Switch>
                <Route path="/home/friends">
                    <div className="container">
                        <h1>Friends</h1>
                    </div>
                </Route>
                <Route path="/home/progress">
                    <div className="container">
                        <p>Progress Tab coming soon!</p>
                    </div>
                </Route>
                <Route path="/home/overview">
                    <div className="container">
                        <h2 className="arcade-dashboard-title">{this.props.user.name}</h2>
                        <div className="arcade-dashboard-userlvl">
                            <span>LV. {this.props.user.level} - {this.props.user.levelexp}/{this.props.user.levelupexp}</span>
                            <div className="progress" style={{height:"2px"}}>
                                <div className="progress-bar" style={{width:(this.props.user.levelexp/this.props.user.levelupexp)*100+"%"}}></div>
                            </div>
                        </div>
                        <div className="row" style={{marginTop: "max(4vh,20px)"}}>
                            <div className="col-md-7">
                                <div className="arcade-dashboard-highscore">
                                    <h4>High Scores</h4>
                                    <p>No Records</p>
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
