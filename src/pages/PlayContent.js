import React, { Component } from 'react'
import SignInForm from '../components/SignInForm'
import PlayList from './PlayList'

export class PlayContent extends Component {
    render() {
        if (this.props.loggedIn) {
            return (
                <div>
                    <PlayList />
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

export default PlayContent
