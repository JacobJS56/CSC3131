import React, { Component } from 'react';

import './TeamButton.css';

class TeamButton extends Component {
        constructor(props) {
        super(props);

        this.state = {
            teamName: this.props.teamName,
            primaryColor: this.props.primaryColor,
            rating: this.props.rating,
            seasonNumber: this.props.seasonNumber,
            gameweekNumber: this.props.gameweekNumber
        }
    }

    render() {
        console.log(this.props.gameweekNumber)
        return (
            <div className="TeamButton">
                <div className="Button" onClick={() => window.location.href='/player/' + this.state.teamName + '/' + this.state.seasonNumber + '/' + this.state.gameweekNumber } style={{backgroundColor: this.state.primaryColor}}>{this.state.teamName}</div>
                <div className="Rating">{this.state.rating}</div>
            </div>
        );
    };
};

export default TeamButton;