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

    removeFromUsers = () => {
        this.props.removeFromUsers(this.props.user)
    }

    render() {
        const add = this.addToUsers
        const remove = this.removeFromUsers
        let action = ""
        let key = ""
        if (this.props.action === "add") {
            action = add
            key = "+"
        } else if (this.props.action === "remove") {
            action = remove
            key = "-"
        }
        return (
            <StyledTile>
                <span>{this.props.name}<button onClick={action}>{key}</button></span>
            </StyledTile>

        );
    }
}

export default FriendTile;