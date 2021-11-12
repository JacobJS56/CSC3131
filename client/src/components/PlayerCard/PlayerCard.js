import React, { Component } from 'react';

import './PlayerCard.css';

class PlayerCard extends Component {
        constructor(props) {
        super(props);

        this.state = {
            playerName: this.props.playerName,
        }
    }

    render() {
        return (
            <div className="PlayerCard">
                {this.state.playerName}
                <div className="RatingRow">
                    <div className="RatingButton">1</div>
                    <div className="RatingButton">2</div>
                    <div className="RatingButton">3</div>
                </div>
            </div>
        );
    };
};

export default PlayerCard;