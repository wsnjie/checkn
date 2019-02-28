import React, { Component } from 'react';

class LogoutButton extends Component {


    render() {
        return (
            <div>
                <span><p>Hello, {this.props.name}</p><button onClick={this.props.logout}>Log Out</button></span>
            </div >
        );
    }
}

export default LogoutButton;