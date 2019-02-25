import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import styled from "styled-components"
import LogoutButton from './account/LogoutButton';
import LoginButton from './account/LoginButton';

const StyledNav = styled.div`
display: flex;
justify-content: space-between;
`


class NavBar extends Component {
    render() {
        const isLoggedIn = this.props.isLoggedIn
        let auth = ""
        if (isLoggedIn == false) {
            auth = <LoginButton />
        } else {
            auth = <LogoutButton name={this.props.name} logout={this.props.logout} />
        }
        return (
            <StyledNav>
                <h1>Check'N</h1>
                {auth}
            </StyledNav>
        );
    }
}

export default NavBar;