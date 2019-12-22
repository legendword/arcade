import React, { Component } from 'react'
import SignInForm from '../components/SignInForm'
import Sidebar from '../components/Sidebar'
import HomeDashboard from './HomeDashboard'

export class HomeContent extends Component {
    render() {
        if (this.props.loggedIn) {
            return (
                <div className="arcade-home-content">
                    <Sidebar className="arcade-home-sidebar" />
                    <HomeDashboard className="arcade-home-dashboard" user={this.props.user} highscore={this.props.highscore} />
                </div>
            )
        }
        else {
            return (
                <div className="container" style={{marginTop:"max(10vh,30px)"}}>
                    <h2 className="text-center" style={{marginBottom:"max(5vh,20px)"}}>Welcome to Legendword Arcade</h2>
                    <SignInForm signIn={this.props.signInEvent} />
                </div>
            )
        }
    }
}

export default HomeContent
