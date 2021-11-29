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
                        valueLabelDisplay="auto"/>
                    <p>Sort by:</p>
                    <TextField id="standard-basic" label="" variant="standard" />
                    <p>Filter:</p>
                    <TextField id="standard-basic" label="" variant="standard" />
                </div>
                <div className="TeamList">
                    <TeamButton teamName="Manchester United" primaryColor="Red" rating="8.3" />
                    <TeamButton teamName="Chelsea" primaryColor="Blue" rating="7.9"/>
                    <TeamButton teamName="Manchester City" primaryColor="Cyan" rating="7.3" />
                    <TeamButton teamName="Tottenham" primaryColor="White" rating="7.1"/>
                </div>
            </div>
        );
    };
};

export default Home;