import React, { Component } from 'react';

import './Player.css';
import PlayerCard from '../PlayerCard/PlayerCard';

class Player extends Component {
        constructor(props) {
        super(props);

        this.state = {
            teamName: decodeURIComponent(window.location.pathname.substring(8, )),
        }
    }

    render() {
        return (
            <div>
                <p className="TeamText">{this.state.teamName}</p>
                <p className="PlayerText">PLAYERS</p>
                <div className="PlayerList">
                    <PlayerCard playerName='Phil Foden'/>
                    <PlayerCard playerName='Paul Pogba'/>
                    <PlayerCard playerName='Kevin Debruyne'/>
                </div>
            </div>
        );
    };
};

export default Player;