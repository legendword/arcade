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
    }
  }

  signInEvent = (e) => {
    e.preventDefault()
  }

  render() {
    return (
      <HashRouter>
        <div className="App">
          <Header />
          <Switch>
            <Route path="/play">
              <PlayContent loggedIn={this.state.loggedIn} user={this.state.user} signInEvent={this.signInEvent} />
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
