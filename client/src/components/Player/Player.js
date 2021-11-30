import React from 'react';

import './Player.css';
import PlayerCard from '../PlayerCard/PlayerCard';

import { useEffect, useState } from "react";
import axios from "axios";

const Player = () => {
    const [data, setData] = useState([]);
    const [seasonNumber, setSeasonNumber] = useState(decodeURIComponent(window.location.pathname.split('/')[3]));
    const [gameweekNumber, setGameweekNumber] = useState(decodeURIComponent(window.location.pathname.split('/')[4]));

    useEffect(async () => {
        console.log(decodeURIComponent(window.location.pathname.split('/')[3]))
        
        const result = await axios.get("http://localhost:5000/api/team/rateable_persons/"+decodeURIComponent(window.location.pathname.split('/')[2]+"/"+seasonNumber+"/"+gameweekNumber))

        setData(result.data);
    }, []);

    let rows = []
    for(let i = 0; i < data.length; i++) {
        rows.push(<PlayerCard playerFirstName={data[i].firstName} playerLastName={data[i].lastName} playerRating={data[i].playerRating} seasonNumber={seasonNumber} gameweekNumber={gameweekNumber} />)
    }

    return (
        <div>
            <p className="TeamText">{decodeURIComponent(window.location.pathname.split('/')[2])}</p>
            <p className="PlayerText">PLAYERS</p>
            <div className="PlayerList">
                {rows}
            </div>
        </div>
    );
};

export default Player;