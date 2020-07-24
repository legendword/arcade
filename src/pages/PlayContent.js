import React, { Component } from 'react'
import SignInForm from '../components/SignInForm'
import PlayList from './PlayList'
import '../css/Play.css'

export class PlayContent extends Component {

    render() {
        if (this.props.loggedIn) {
            if (this.props.currentGame) {
                const Game = this.props.currentGame.component
                return (
                    <div className="arcade-play-outer">
                        <Game gameCode={this.props.currentGame.gameCode} leaveGame={this.props.leaveGame} gameEnd={this.props.gameEnd} highscore={this.props.highscore} highscoreUpdate={this.props.highscoreUpdate} />
                    </div>
                )
            }
            else {
                return (
                    <div className="arcade-play-outer">
                        <PlayList gameSelect={this.props.gameSelect} />
                    </div>
                )
            }
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

export default PlayContent
