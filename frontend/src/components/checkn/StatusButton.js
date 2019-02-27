import React, { Component } from 'react';
import styled from "styled-components"

const StyledStatusButton = styled.button`
height: 30px;
width: 40px;
`

class StatusButton extends Component {

    updateStatus = () => {
        this.props.updateStatus(this.props.status)
    }

    render() {
        return (
            <div>
                <StyledStatusButton onClick={this.updateStatus}>{this.props.status}</StyledStatusButton>
            </div>
        );
    }
}

export default StatusButton;