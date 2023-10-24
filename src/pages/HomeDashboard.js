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
                    <div className="col-12 arcade-dashboard-main">
                        <h4 style={{marginTop: "max(2vh,10px)"}}>Legendword Arcade Insiders Beta {packageJSON?packageJSON.version:""}</h4>
                        <p>Submit Issues through <a href="https://github.com/legendword/arcade/issues">the GitHub Repo</a>.</p>
                        <p>Note: Legendword Arcade is now in archive mode. No new games / features will be added. Existing singleplayer games are kept and still available to play. To play multiplayer games, check out <a href="https://games.legendword.com/">Legendword Games</a>.</p>
                        <div className="arcade-dashboard-goPlay">
                            <Link to="/play" className="arcade-btn-lgNav">PLAY SINGLEPLAYER</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomeDashboard
