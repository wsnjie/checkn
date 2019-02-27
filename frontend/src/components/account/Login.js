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
        let route = "/dashboard/"
        const isLoggedIn = this.props.isLoggedIn
        const checknCheck = this.props.user.app_user.place
        if (checknCheck > 0) {
            return <Redirect to="/checkn/" />
        }

        if (isLoggedIn === true) {
            console.log(route)
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