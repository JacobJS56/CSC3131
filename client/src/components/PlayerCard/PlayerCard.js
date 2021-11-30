import React, { Component } from 'react';

import './PlayerCard.css';

class PlayerCard extends Component {
        constructor(props) {
        super(props);

        this.state = {
            playerFirstName: this.props.playerFirstName,
            playerLastName: this.props.playerLastName,
            playerRating: this.props.playerRating,
        }
    }

    render() {
        const playerFirstName =  this.state.playerFirstName;
        const playerLastName =  this.state.playerLastName;

        return (
            <div className="PlayerCard">
                <div className="NameRow">
                    <p className="PlayerFirstName">{playerFirstName}</p>
                    <p className="PlayerLastName">{playerLastName}</p>
                </div>
                <div className="RatingRow">
                    <div className="RatingButton">1</div>
                    <div className="RatingButton">2</div>
                    <div className="RatingButton">3</div>
                    <div className="RatingButton">4</div>
                    <div className="RatingButton">5</div>
                    <div className="RatingButton">6</div>
                    <div className="RatingButton">7</div>
                    <div className="RatingButton">8</div>
                    <div className="RatingButton">9</div>
                    <div className="RatingButton">10</div>
                </div>
                <p className="FanRatingText">Fan Rating:<br/>{this.state.playerRating}</p>
            </div>
        );
    };
};

export default PlayerCard;