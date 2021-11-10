import React, { Component } from 'react';

import './Home.css';
import Slider from "@material-ui/core/Slider";
import TextField from '@mui/material/TextField';
import TeamButton from '../TeamButton/TeamButton';

class Home extends Component {
        constructor(props) {
        super(props);

        this.state = {
        }
    }

    render() {
        return (
            <div>
                <div className="TopBar">
                    <p>Gameweek</p>
                    <Slider
                        defaultValue={1}
                        aria-labelledby="discrete-slider-small-steps"
                        step={1}
                        marks
                        min={1}
                        max={20}
                        valueLabelDisplay="auto"/>
                    <p>Sort by:</p>
                    <TextField id="standard-basic" label="" variant="standard" />
                    <p>Filter:</p>
                    <TextField id="standard-basic" label="" variant="standard" />
                </div>
                <p className="TeamText">TEAMS</p>
                <div className="TeamList">
                    <TeamButton teamName="Manchester United" primaryColor="Red" />
                    <TeamButton teamName="Chelsea" primaryColor="Blue" />
                </div>
            </div>
        );
    };
};

export default Home;