import React from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import Header from './components/Header';
import HomeContent from './pages/HomeContent';
import PlayContent from './pages/PlayContent';
import './App.css'

export class App extends React.Component {
  state = {
    loggedIn: true,
    user: {
      name: "Legendword Insiders",
      level: 1,
      levelexp: 0,
      levelupexp: 100
    },
    highscore: { //must be either a number or a string from JSON.stringify
      1: 0,
      2: null,
      3: null
    },
    inGame: false,
    currentGame: null
  }

  fetchHighscore = () => {
    let st = window.localStorage.getItem("arcade-highscore")
    if (!st) {
      window.localStorage.setItem("arcade-highscore", JSON.stringify(this.state.highscore))
    }
    else {
      this.setState({
        highscore: JSON.parse(st)
      })
    }
  }

  signInEvent = (e) => {
    e.preventDefault()
  }

  gameEnd = () => {
    this.setState({
      inGame: false
    })
  }

  leaveGame = () => {
    this.setState({
      inGame: false,
      currentGame: null
    })
  }

  gameSelect = (w) => {
      this.setState({
          inGame: true,
          currentGame: w
      })
  }

  highscoreUpdate = (w) => {
    let hs = this.state.highscore
    hs[w.gameCode] = w.score
    window.localStorage.setItem("arcade-highscore", JSON.stringify(hs))
    this.setState({
      highscore: hs
    })
  }

  componentDidMount() {
    this.fetchHighscore()
  }

  render() {
    return (
      <HashRouter>
        <div className="App">
          <Header inGame={this.state.inGame} leaveGame={this.leaveGame} />
          <Switch>
            <Route path="/play">
              <PlayContent loggedIn={this.state.loggedIn} user={this.state.user} highscore={this.state.highscore} highscoreUpdate={this.highscoreUpdate} signInEvent={this.signInEvent} inGame={this.state.inGame} currentGame={this.state.currentGame} gameSelect={this.gameSelect} leaveGame={this.leaveGame} gameEnd={this.gameEnd} />
            </Route>
            <Route path="/home">
              <HomeContent loggedIn={this.state.loggedIn} user={this.state.user} highscore={this.state.highscore} signInEvent={this.signInEvent} />
            </Route>
            <Route path="/">
              <Redirect to="/home/overview" />
            </Route>
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

export default App
