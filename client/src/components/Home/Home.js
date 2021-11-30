import React from 'react';

import './Home.css';
import Slider from "@material-ui/core/Slider";
import TextField from '@mui/material/TextField';
import TeamButton from '../TeamButton/TeamButton';

import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
    const [data, setData] = useState([]);
    const [gameweekData, setGameweekData] = useState([]);

    useEffect(async () => {
        const result = await axios.get("http://localhost:5000/api/gameweek/team/1")
        setData(result.data);
    }, []);

    const handleInputChange = async (event, newValue) => {
        try{
            const result = await axios.get("http://localhost:5000/api/gameweek/team/" + newValue)
            setData(result.data);
        }
        catch (e) {
            setData([]);
        }
    }

    console.log(data)
    let rows = []

    for(let i = 0; i < data.length; i++) {
        rows.push(<TeamButton teamName={data[i].teamName} primaryColor={data[i].primaryColour} rating={data[i].rating} />)
    }

    return (
        <div>
            <p className="TeamText">TEAMS</p>
            <div className="TopBar">
                <p>Gameweek</p>
                <Slider
                    defaultValue={1}
                    aria-labelledby="discrete-slider-small-steps"
                    step={1}
                    marks
                    min={1}
                    max={20}
                    onChange={handleInputChange}
                    valueLabelDisplay="auto"/>
                <p>Sort by:</p>
                <TextField id="standard-basic" label="" variant="standard" />
                <p>Filter:</p>
                <TextField id="standard-basic" label="" variant="standard" />
            </div>
            <div className="TeamList">
                {rows}
            </div>
        </div>
    );
};

export default Home;