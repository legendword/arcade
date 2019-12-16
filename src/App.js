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
      name: "Programmer",
      level: 1,
      levelexp: 40,
      levelupexp: 100
    },
    inGame: false,
    currentGame: null
  }

  signInEvent = (e) => {
    e.preventDefault()
  }

  leaveGame = () => {
    this.setState({
      inGame: false,
      currentGame: null
    })
  }

  gameSelect = (w) => {
      console.log(w)
      this.setState({
          inGame: true,
          currentGame: w
      })
  }

  render() {
    return (
      <HashRouter>
        <div className="App">
          <Header inGame={this.state.inGame} leaveGame={this.leaveGame} />
          <Switch>
            <Route path="/play">
              <PlayContent loggedIn={this.state.loggedIn} user={this.state.user} signInEvent={this.signInEvent} inGame={this.state.inGame} currentGame={this.state.currentGame} gameSelect={this.gameSelect} leaveGame={this.leaveGame} />
            </Route>
            <Route path="/home">
              <HomeContent loggedIn={this.state.loggedIn} user={this.state.user} signInEvent={this.signInEvent} />
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
