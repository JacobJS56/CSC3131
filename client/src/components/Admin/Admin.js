import React, { Component } from 'react';
import Fab from "@mui/material/Fab";

import './Admin.css';

class Admin extends Component {
        constructor(props) {
        super(props);

        this.state = {
        }
    }

    render() {
        return (
            <div>
                <p className="AdminText">ADMIN DASHBOARD</p>
                <div className="AdminPlayerButtons" >
                    <Fab variant="extended" >VIEW PLAYERS</Fab>
                    <Fab variant="extended" >ADD PLAYERS</Fab>
                    <Fab variant="extended">MODIFY PLAYERS</Fab>
                    <Fab variant="extended">DELETE PLAYERS</Fab>
                </div>
                <div className="AdminPlayerButtons">
                    <Fab variant="extended" >VIEW TEAMS</Fab>
                    <Fab variant="extended" >ADD TEAMS</Fab>
                    <Fab variant="extended" >MODIFY TEAMS</Fab>
                    <Fab variant="extended" >DELETE TEAMS</Fab>
                </div>
            </div>
        );
    };
};

export default Admin;