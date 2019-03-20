import React, { Component } from 'react';
import styled from 'styled-components'

const StyledTile = styled.div`
height: 200px;
width: 200px;
border: 1px solid black;
`

class UserTile extends Component {
    render() {
        return (
            <StyledTile>
                <h1>{this.props.user.name}</h1>
                <h3>Current Status</h3>
                <h4>{this.props.user.status}</h4>
                <p>Coordinates: {this.props.user.lat} {this.props.user.lon}</p>
            </StyledTile>
        );
    }
}

export default UserTile;