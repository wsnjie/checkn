import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import Login from './components/account/Login';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import Dashboard from './components/Dashboard';
import Checkn from './components/checkn/Checkn';

axios.defaults.xsrfHeaderName = "X-CSRFToken";


class App extends Component {
  state = {
    user: {
      app_user: {
        name: ""
      }
    },
    token: {},
    isLoggedIn: false
  }
  componentDidMount() {

  }

  getCurrentUser = () => {
    let config = {
      headers: {
        'Authorization': `Token ${this.state.token.key}`
      }
    }
    axios.get("/api/current_user/", config).then((res) => {
      this.setState({ user: res.data })
      this.setState({ isLoggedIn: true })
    })
      .then(() => {


      })
  }
  authenticateUser = (username, password) => {
    axios.post("/rest-auth/login/", { 'username': username, 'email': "", 'password': password })
      .then((res) => {
        console.log(res.data)
        this.setState({ token: res.data })
      })
      .then(() => {
        this.getCurrentUser()
      })
  }

  registerUser = (username, password, password2) => {
    axios.post("/rest-auth/registration/", { 'username': username, 'email': username + "@gmail.com", 'password1': password, 'password2': password2 })
      .then((res) => {
        console.log(res.data)
        this.setState({ token: res.data })
      })
      .then(() => {
        this.getCurrentUser()
      })
  }


  logout = () => {
    let config = {
      headers: {
        'Authorization': `Token ${this.state.token.key}`
      }
    }
    axios.post("/rest-auth/logout/", {}, config).then((res) => {
      this.setState({ isLoggedIn: false, token: "" })
    })
  }

  clearUserPlace = () => {
    let user = { ...this.state.user }
    user.app_user.place = null
    this.setState({ user: user })
  }

  render() {
    const loginComponent = () => {
      return <Login
        user={this.state.user}
        authenticateUser={this.authenticateUser}
        getCurrentUser={this.getCurrentUser}
        isLoggedIn={this.state.isLoggedIn}
        registerUser={this.registerUser}
      />
    }

    const dashboardComponent = () => {
      return <Dashboard
        user={this.state.user}
        token={this.state.token}
        isLoggedIn={this.state.isLoggedIn}
        friends={this.state.user.app_user.friends}
        getCurrentUser={this.getCurrentUser}
      />
    }

    const checknComponent = () => {
      return <Checkn
        user={this.state.user}
        token={this.state.token}
        isLoggedIn={this.state.isLoggedIn}
        getCurrentUser={this.getCurrentUser}
        clearUserPlace={this.clearUserPlace}
      />
    }
    return (
      <Router>
        <div>
          <NavBar name={this.state.user.app_user.name} logout={this.logout} isLoggedIn={this.state.isLoggedIn}></NavBar>
          <Switch>
            <Route exact path="/" render={loginComponent} />
            <Route exact path="/dashboard/" render={dashboardComponent} />
            <Route exact path="/checkn/" render={checknComponent} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
