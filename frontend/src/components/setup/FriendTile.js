import React, { Component } from 'react';
import styled from 'styled-components'

const StyledTile = styled.div`
border: 1px black solid;
width: 250px;
`

class FriendTile extends Component {
    render() {
        return (
            <StyledTile>
                {this.props.name}
            </StyledTile>

        );
    }
}

export default FriendTile;