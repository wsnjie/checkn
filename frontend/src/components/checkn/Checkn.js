import React, { Component } from 'react';
import axios from "axios"
import UserTile from './UserTile';
import styled from 'styled-components'
import StatusButton from './StatusButton';

const StyledStatusBar = styled.div`
display: flex;
`

const StyledButtonBar = styled.div`
display:flex;
`

class Checkn extends Component {
    state = {
        place: {
            user_list: [
                {
                    name: "",
                    mood: ""
                }
            ]
        },
        statusOptions: [":)", ":(", "X"]
    }
    componentDidMount() {
        console.log(this.props.user)
        console.log(this.state.place)
        this.getPlace()
    }

    getPlace = () => {
        const place = this.props.user.app_user.place
        console.log(place)
        axios.get(`http://localhost:8000/api/place/${place}`).then((res) => {
            this.setState({ place: res.data })
        })
    }
    updateStatus = (status) => {
        let config = {
            headers: {
                'Authorization': `Token ${this.props.token.key}`
            }
        }
        let userUpdate = this.props.user.app_user
        userUpdate.status = status
        axios.put(`http://localhost:8000/api/appuser/${userUpdate.id}/`, userUpdate, config).then((res) => {
            return console.log(res)
        }).then(() => {
            this.getPlace()
        })
    }
    render() {
        let userTiles =
            this.state.place.user_list.map((user, i) => {
                return <UserTile
                    key={i}
                    user={user}
                />
            })

        return (
            <div>
                <StyledButtonBar>
                    {this.state.statusOptions.map((option, i) => {
                        return <StatusButton
                            key={i}
                            status={option}
                            updateStatus={this.updateStatus}
                        />
                    })}
                </StyledButtonBar>
                <StyledStatusBar>
                    {userTiles}
                </StyledStatusBar>
                <button onClick={this.getPlace}></button>
            </div>
        );
    }
}

export default Checkn;