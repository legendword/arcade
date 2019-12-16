import React, { Component } from 'react'
import SignInForm from '../components/SignInForm'
import PlayList from './PlayList'

export class PlayContent extends Component {

    render() {
        if (this.props.loggedIn) {
            if (this.props.inGame) {
                const Game = this.props.currentGame.component
                return (
                    <div>
                        <Game leaveGame={this.props.leaveGame} />
                    </div>
                )
            }
            else {
                return (
                    <div>
                        <PlayList gameSelect={this.props.gameSelect} />
                    </div>
                )
            }
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
