import React, { Component } from 'react';
import styled from 'styled-components'

const StyledTile = styled.div`
border: 1px black solid;
width: 250px;
`

class FriendTile extends Component {
    addToUsers = () => {
        this.props.addToUsers(this.props.user)
    }

    render() {
        return (
            <StyledTile>
                <span>{this.props.name}<button onClick={this.addToUsers}>+</button></span>
            </StyledTile>

        );
    }
}

export default FriendTile;