import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import Login from './components/account/Login';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import Dashboard from './components/Dashboard';

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
    axios.get("http://localhost:8000/api/current_user/", config).then((res) => {
      this.setState({ user: res.data })
      this.setState({ isLoggedIn: true })
    })
      .then(() => {
        console.log("redirecting")

      })
  }
  authenticateUser = (username, password) => {
    axios.post("http://localhost:8000/rest-auth/login/", { 'username': username, 'email': "", 'password': password })
      .then((res) => {
        console.log(res.data)
        this.setState({ token: res.data })
      })
      .then(() => {
        this.getCurrentUser()
      })
  }


  logout = () => {

  }

  render() {
    const loginComponent = () => {
      return <Login
        authenticateUser={this.authenticateUser}
        getCurrentUser={this.getCurrentUser}
        isLoggedIn={this.state.isLoggedIn}
      />
    }

    const dashboardComponent = () => {
      return <Dashboard />
    }
    return (
      <Router>
        <div>
          <NavBar name={this.state.user.app_user.name} logout={this.state.logout} isLoggedIn={this.state.isLoggedIn}></NavBar>
          <Switch>
            <Route exact path="/" render={loginComponent} />
            <Route exact path="/dashboard/" render={dashboardComponent} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
