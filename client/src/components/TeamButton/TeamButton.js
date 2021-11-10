import React, { Component } from 'react';

import './TeamButton.css';

class TeamButton extends Component {
        constructor(props) {
        super(props);

        this.state = {
            teamName: this.props.teamName,
            primaryColor: this.props.primaryColor
        }
    }

    render() {
        return (
            <div>
                <div>{this.state.teamName}</div>
            </div>
        );
    };
};

export default TeamButton;