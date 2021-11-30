import React from 'react';

import './Player.css';
import PlayerCard from '../PlayerCard/PlayerCard';

import { useEffect, useState } from "react";
import axios from "axios";

const Player = () => {
    const [data, setData] = useState([]);

    useEffect(async () => {
            const result = await axios.get("http://localhost:5000/api/team/rateable_persons/"+decodeURIComponent(window.location.pathname.substring(8, )))
        setData(result.data);
    }, []);

    console.log(data)
    let rows = []

    for(let i = 0; i < data.length; i++) {
        rows.push(<PlayerCard playerFirstName={data[i].firstName} playerLastName={data[i].lastName} playerRating={data[i].playerRating} />)
    }

    return (
        <div>
            <p className="TeamText">{decodeURIComponent(window.location.pathname.substring(8, ))}</p>
            <p className="PlayerText">PLAYERS</p>
            <div className="PlayerList">
                {rows}
            </div>
        </div>
    );
};

export default Player;