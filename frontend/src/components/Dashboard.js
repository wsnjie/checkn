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

    addToUsers = (friend) => {
        console.log(this.props.friends)
        console.log(friend)
        console.log(this.props.friends[friend])
        const users = this.state.users
        users.push(this.props.friends[friend])
        this.setState({ users: users })
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
                            key={i}
                            user={i}
                            name={friend.name}
                            addToUsers={this.addToUsers}
                        />
                    })}
                </StyledFriendsList>
            </StyledSetup>
        );
    }
}

export default Dashboard;