import React, { Component } from 'react';
import axios from "axios"
import UserTile from './UserTile';
import MapContainer from './MapContainer'
import styled from 'styled-components'
import StatusButton from './StatusButton';
import { Redirect } from "react-router-dom"

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
        this.getPlace()
        navigator.geolocation.getCurrentPosition(this.updateLocation)
        navigator.geolocation.watchPosition(this.updateLocation)
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch()
    }
    getPlace = () => {
        const place = this.props.user.app_user.place
        console.log(place)
        axios.get(`/api/place/${place}`).then((res) => {
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
        axios.put(`/api/appuser/${userUpdate.id}/`, userUpdate, config).then((res) => {
            return
        }).then(() => {
            this.getPlace()
        })
    }

    updateLocation = (position) => {
        let config = {
            headers: {
                'Authorization': `Token ${this.props.token.key}`
            }
        }
        let userUpdate = this.props.user.app_user
        const lat = parseFloat(position.coords.latitude.toFixed(6))
        const lon = parseFloat(position.coords.longitude.toFixed(6))
        console.log("Latitude: " + lat + " Longitude: " + lon)
        userUpdate.lat = lat
        userUpdate.lon = lon

        axios.put(`/api/appuser/${userUpdate.id}/`, userUpdate, config).then((res) => {
            return
        }).then(() => {
            this.getPlace()
        })
    }
    endPlace = () => {
        let config = {
            headers: {
                'Authorization': `Token ${this.props.token.key}`
            }
        }
        this.state.place.user_list.forEach((user) => {
            const currentUser = user
            currentUser.place = null
            console.log(currentUser)
            axios.put(`/api/appuser/${currentUser.id}/`, currentUser, config)
        })

    }

    clearPlace = async (clear) => {
        await clear()
        this.props.clearUserPlace()
    }
    render() {
        const isLoggedIn = this.props.isLoggedIn
        const checknCheck = this.props.user.app_user.place
        if (isLoggedIn === false) {
            return <Redirect to="/" />
        }

        if (checknCheck === null) {
            return <Redirect to="/dashboard/" />
        }

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
                <button onClick={this.getPlace}>@</button>
                <button onClick={() => this.clearPlace(this.endPlace)}>End CheckN</button>
                <MapContainer user={this.props.user.app_user} users={this.state.place.user_list} />
            </div>
        );
    }
}

export default Checkn;