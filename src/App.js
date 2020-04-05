import React from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import Header from './components/Header';
import HomeContent from './pages/HomeContent';
import PlayContent from './pages/PlayContent';
import './App.css'
import $ from 'jquery'  

export class App extends React.Component {
  state = {
    loggedIn: true,
    guestMode: true,
    user: {
      uid: 0,
      name: "Guest",
      group: 1,
      experience: 0,
      level: 1,
      levelexp: 0,
      levelupexp: 100
    },
    highscore: { //must be either a number or a string from JSON.stringify
      1: 0,
      2: null,
      3: 0
    },
    inGame: false,
    currentGame: null
  }

  fetchLocalHighscore = () => {
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

  playAsGuest = () => {
    this.setState({
      loggedIn: true,
      guestMode: true,
      user: {
        uid: 0,
        name: "Guest",
        group: 1,
        experience: 0,
        level: 1,
        levelexp: 0,
        levelupexp: 100
      }
    });
    this.fetchLocalHighscore();
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
    if (this.state.guestMode) {
      let hs = this.state.highscore
      hs[w.gameCode] = w.score
      window.localStorage.setItem("arcade-highscore", JSON.stringify(hs))
      this.setState({
        highscore: hs
      })
    }
    else {
      $.post("http://legendword.com/arcade-backend/highscore.php",{action:"set",game:w.gameCode,score:w.score}, (t) => {
        let s = JSON.parse(t);
        console.log(s);
        if (s.error) {
          window.alert("Highscore Upload Failed:\n"+s.message);
        }
        else {
          let hs = this.state.highscore
          hs[w.gameCode] = w.score;
          this.setState({
            highscore: hs
          })
        }
      })
    }
  }

  fetchUserInfo = () => {
    $.post("http://legendword.com/arcade-backend/userinfo.php",{},(t) => {
      let s = JSON.parse(t);
      console.log(s);
      if (s.is_online==false) {
        this.setState({
          loggedIn: false
        })
      }
      else {
        this.setState({
          loggedIn: true,
          guestMode: false,
          user: {
            uid: s.uid,
            name: s.name,
            group: s.group,
            experience: s.experience | 0
          }
        });
        this.fetchHighscore();
      }
    });
  }

  fetchHighscore = () => {
    $.post("http://legendword.com/arcade-backend/highscore.php",{action:"getall"},(t) => {
      let s = JSON.parse(t);
      console.log(s);
      if (s.error) {
        console.log("Highscore Fetch failed:");
        console.error(s.message);
      }
      else {
        delete s.error;
        this.setState({
          highscore: s
        })
      }
    })
  }

  logOut = () => {
    this.setState({
      loggedIn: false,
      guestMode: false
    })
  }

  componentDidMount() {
    this.fetchUserInfo()
  }

  render() {
    return (
      <HashRouter>
        <div className="App">
          <Header inGame={this.state.inGame} leaveGame={this.leaveGame} />
          <Switch>
            <Route path="/play">
              <PlayContent loggedIn={this.state.loggedIn} user={this.state.user} highscore={this.state.highscore} highscoreUpdate={this.highscoreUpdate} playAsGuest={this.playAsGuest} inGame={this.state.inGame} currentGame={this.state.currentGame} gameSelect={this.gameSelect} leaveGame={this.leaveGame} gameEnd={this.gameEnd} />
            </Route>
            <Route path="/home">
              <HomeContent loggedIn={this.state.loggedIn} logOut={this.logOut} guestMode={this.state.guestMode} user={this.state.user} highscore={this.state.highscore} playAsGuest={this.playAsGuest} />
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
