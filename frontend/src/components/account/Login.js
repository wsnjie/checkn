import React, { Component } from 'react';
import { Redirect } from "react-router-dom"

class Login extends Component {
    state = {
        value: {
            username: "",
            email: "",
            password: "",
            password2: ""
        },
        register: false
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

    toggleRegister = () => {
        this.setState({ register: !this.state.register })
    }

    register = () => {
        this.props.registerUser(this.state.value.username, this.state.value.password, this.state.value.password2)
    }

    render() {

        const isLoggedIn = this.props.isLoggedIn
        const checknCheck = this.props.user.app_user.place
        // if (checknCheck > 0) {
        //     return <Redirect to="/checkn/" />
        // }

        if (isLoggedIn === true) {
            return <Redirect to="/dashboard/" />
        }

        return (
            <div>
                <input name="username" onChange={this.handleChange}></input>
                <input name="password" type="password" onChange={this.handleChange}></input>
                {this.state.register ? <input name="password2" type="password" onChange={this.handleChange}></input> : null}
                {this.state.register ? null : <button onClick={this.login}>Login</button>}
                {this.state.register ? <button onClick={this.register}>Submit</button> : null}
                <br></br>
                <button onClick={this.toggleRegister}>Register</button>
            </div>
        );
    }
}

export default Login;