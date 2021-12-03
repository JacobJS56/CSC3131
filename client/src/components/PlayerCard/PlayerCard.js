import React, { Component } from 'react';
import axios from "axios";

import './PlayerCard.css';

class PlayerCard extends Component {
        constructor(props) {
        super(props);

        this.state = {
            seasonNumber: this.props.seasonNumber,
            gameweekNumber: this.props.gameweekNumber,
            playerFirstName: this.props.playerFirstName,
            playerLastName: this.props.playerLastName,
            playerRating: this.props.playerRating,
        }
        this.handleClick = this.handleClick.bind(this);
    }

    async handleClick(num) {
        const body = {
            seasonNumber: this.state.seasonNumber,
            gameweekNumber: this.state.gameweekNumber,
            firstName: this.state.playerFirstName,
            lastName: this.state.playerLastName,
            rating: num
        }
        console.log(body)
        const result = await axios.post("http://localhost:5000/api/rateable_person/rating", body)
        this.setState(prevState => ({
            playerRating: result.data.rating
        }));
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
                    <div className="RatingButton" onClick={e => this.handleClick(1)}>1</div>
                    <div className="RatingButton" onClick={e => this.handleClick(2)}>2</div>
                    <div className="RatingButton" onClick={e => this.handleClick(3)}>3</div>
                    <div className="RatingButton" onClick={e => this.handleClick(4)}>4</div>
                    <div className="RatingButton" onClick={e => this.handleClick(5)}>5</div>
                    <div className="RatingButton" onClick={e => this.handleClick(6)}>6</div>
                    <div className="RatingButton" onClick={e => this.handleClick(7)}>7</div>
                    <div className="RatingButton" onClick={e => this.handleClick(8)}>8</div>
                    <div className="RatingButton" onClick={e => this.handleClick(9)}>9</div>
                    <div className="RatingButton" onClick={e => this.handleClick(10)}>10</div>
                </div>
                <p className="FanRatingText">Fan Rating:<br/>{this.state.playerRating}</p>
            </div>
        );
    };
};

export default PlayerCard;