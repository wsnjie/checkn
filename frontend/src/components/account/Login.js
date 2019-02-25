import React, { Component } from 'react';
import { Redirect } from "react-router-dom"

class Login extends Component {
    state = {
        value: {
            username: "",
            email: "",
            password: ""
        }
    }

    handleChange = (e) => {
        let value = { ...this.state.value }
        value[e.target.name] = e.target.value
        this.setState({ value: value })
        console.log(this.state.value)

    }

    login = async () => {
        await this.props.authenticateUser(this.state.value.username, this.state.value.password)
        return <Redirect to="/dashboard/" />
    }

    render() {
        const isLoggedIn = this.props.isLoggedIn
        if (isLoggedIn === true) {
            return <Redirect to="/dashboard/" />
        }
        return (
            <div>
                <input name="username" onChange={this.handleChange}></input>
                <input name="password" type="password" onChange={this.handleChange}></input>
                <button onClick={this.login}>Login</button>
            </div>
        );
    }
}

export default Login;