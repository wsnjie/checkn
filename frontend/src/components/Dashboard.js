import React, { Component } from 'react';
import { Redirect } from "react-router-dom"
import styled from 'styled-components'
import FriendTile from './setup/FriendTile';

const StyledSetup = styled.div`
display: flex;
flex-direction: column;
`
const StyledHeader = styled.div`

`
const StyledFriendsList = styled.div`

`

class Dashboard extends Component {
    state = {
        name: "",
        address: "",
        users: []

    }
    render() {
        const isLoggedIn = this.props.isLoggedIn
        if (isLoggedIn === false) {
            return <Redirect to="/" />
        }
        return (
            <StyledSetup>
                <h1>Set Up Your Check'n</h1>
                <StyledHeader>
                    <input placeholder="Name"></input>
                    <input placeholder="Address"></input>
                </StyledHeader>
                <StyledFriendsList>
                    <h2>Select Your Friends</h2>
                    {this.props.friends.map((friend, i) => {
                        return <FriendTile
                            name={friend.name}
                        />
                    })}
                </StyledFriendsList>
            </StyledSetup>
        );
    }
}

export default Dashboard;