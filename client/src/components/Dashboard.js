import React, { Component } from 'react';
import { Redirect } from "react-router-dom"
import styled from 'styled-components'
import FriendTile from './setup/FriendTile';
import axios from 'axios';

const StyledSetup = styled.div`
display: flex;
flex-direction: column;
`
const StyledHeader = styled.div`

`
const StyledFriendsList = styled.div`
display: flex;
flex-direction: row;
`
const StyledList = styled.div`
display: flex;
flex-direction: column;
`

class Dashboard extends Component {
    state = {
        value: {
            name: "",
            address: ""
        },
        users: [],
        placeId: ""

    }
    handleChange = (e) => {
        let value = { ...this.state.value }
        value[e.target.name] = e.target.value
        this.setState({ value: value })
        console.log(this.state.value)

    }

    addToUsers = (friend) => {
        const users = this.state.users
        users.push(this.props.friends[friend])
        this.setState({ users: users })
    }

    removeFromUsers = (friend) => {
        const users = this.state.users
        users.splice(friend, 1)
        this.setState({ users: users })
    }

    assignUsers = (users, pId) => {
        let config = {
            headers: {
                'Authorization': `Token ${this.props.token.key}`
            }
        }
        users.push(this.props.user.app_user)
        users.forEach((user) => {
            console.log(user)
            let payload = user
            payload.place = pId
            axios.put(`/api/appuser/${payload.id}/`, payload, config)
                .then((res) => {
                    return console.log(res)
                }).then(() => {
                    this.props.getCurrentUser()
                })
        })
    }

    createPlace = () => {
        let newPlace = {
            name: this.state.value.name
        }


        let config = {
            headers: {
                'Authorization': `Token ${this.props.token.key}`
            }
        }
        axios.post("ß/api/place/", newPlace, config).then((res) => {
            this.setState({ placeId: res.data.id })
            return console.log(res.data)
        }).then(() => {
            this.assignUsers(this.state.users, this.state.placeId)
        })

    }



    render() {
        let route = "/"
        const isLoggedIn = this.props.isLoggedIn
        const checknCheck = this.props.user.app_user.place
        if (checknCheck > 0) {
            return <Redirect to="/checkn/" />
        }

        if (isLoggedIn === false) {
            console.log(route)
            return <Redirect to="/" />
        }



        return (
            <StyledSetup>
                <h1>Set Up Your Check'n</h1>
                <StyledHeader>
                    <input name="name" placeholder="Name" onChange={this.handleChange}></input>
                    <input name="addres" placeholder="Address" onChange={this.handleChange}></input>
                </StyledHeader>
                <StyledFriendsList>
                    <StyledList>
                        <h2>Select Your Friends</h2>
                        {this.props.friends.map((friend, i) => {
                            return <FriendTile
                                key={i}
                                user={i}
                                name={friend.name}
                                addToUsers={this.addToUsers}
                                action="add"
                            />
                        })}
                    </StyledList>
                    <StyledList>
                        <h2>Selected Friends</h2>
                        {this.state.users.map((friend, i) => {
                            return <FriendTile
                                key={i}
                                user={i}
                                name={friend.name}
                                removeFromUsers={this.removeFromUsers}
                                action="remove"
                            />
                        })}
                    </StyledList>
                </StyledFriendsList>
                <button onClick={this.createPlace}>Get Started</button>
            </StyledSetup>
        );
    }
}

export default Dashboard;