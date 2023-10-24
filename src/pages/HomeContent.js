import React, { Component } from 'react'
import '../css/Home.css'
import { Switch, Route, Redirect, Link } from 'react-router-dom'
import $ from 'jquery'
import SignInForm from '../components/SignInForm'
import Sidebar from '../components/Sidebar'
import HomeDashboard from './HomeDashboard'
import Changelog from './Changelog'
import HomeProgress from './HomeProgress'
import HomeFriends from './HomeFriends'

export class HomeContent extends Component {

    loginAction = () => {
        if (this.props.guestMode) {
            window.location.href = "https://legendword.com/login?from=http://legendword.com/arcade";
        }
        else {
            $.post("https://legendword.com/user_system/logout.php",{},(t)=>{
                this.props.logOut()
            });
        }
    }

    newAccount = () => {
        window.location.href = "https://legendword.com/register"
    }

    render() {
        if (this.props.loggedIn) {
            return (
                <div className="arcade-home-content">
                    <Sidebar className="arcade-home-sidebar" />
                    <div className="arcade-home-main">
                        <Switch>
                            <Route path="/home/changelog">
                                <Changelog />
                            </Route>
                            <Route path="/home/progress">
                                <HomeProgress highscore={this.props.highscore} />
                            </Route>
                            <Route path="/home/overview">
                                <HomeDashboard logOut={this.props.logOut} guestMode={this.props.guestMode} user={this.props.user} highscore={this.props.highscore} />
                            </Route>
                            <Route path="/home">
                                <Redirect to="/home/overview" />
                            </Route>
                        </Switch>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="container" style={{marginTop:"max(10vh,30px)"}}>
                    <h2 className="text-center" style={{marginBottom:"max(5vh,20px)"}}>Welcome to Legendword Arcade</h2>
                    <SignInForm playAsGuest={this.props.playAsGuest} />
                </div>
            )
        }
    }
}

export default HomeContent
