import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import Login from './components/account/Login';

axios.defaults.xsrfHeaderName = "X-CSRFToken";


class App extends Component {
  state = {
    user: {},
    token: {}
  }
  componentDidMount() {

  }
  authenticateUser = (username, password) => {
    axios.post("http://localhost:8000/rest-auth/login/", { 'username': username, 'email': "", 'password': password })
      .then((res) => {
        console.log(res.data)
        this.setState({ token: res.data })
      })
  }
  getCurrentUser = () => {
    let config = {
      headers: {
        'Authorization': `Token ${this.state.token.key}`
      }
    }
    axios.get("http://localhost:8000/api/current_user/", config).then((res) => {
      this.setState({ user: res.data })
      console.log("success")
    })
  }
  render() {
    return (
      <div>
        <Login authenticateUser={this.authenticateUser} />
        <button onClick={this.getCurrentUser}>Test</button>
      </div>
    );
  }
}

export default App;
