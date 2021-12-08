import React, { Component } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from "axios";
import Alert from '@mui/material/Alert';

import './Admin.css';

class Admin extends Component {
        constructor(props) {
        super(props);

        this.state = {
            season1: 1,
            season2: 1,
            gameweek1: 1,
            season3: 1,
            gameweek2: 1,
            teamName1: "",
            primaryColour: "",
            season4: 1,
            gameweek4: 1,
            teamName2: "",
            firstName: "",
            secondName: "",
            modal: " "
        }
        this.submitSeason = this.submitSeason.bind(this);
    }

    async submitSeason() {
        let modal = "";
        const body = {
            seasonNumber: this.state.season1,
        }
        try {
            await axios.post("http://localhost:5000/api/season/", body)
            modal = <Alert severity="success">Successful Request</Alert>
            console.log(body);
        } catch(e) {
            console.log(e);
            modal = <Alert severity="error">This is an error alert — check console</Alert>
        }
    }

    async submitGameweek() {
        let modal = "";
        const body = {
            seasonNumber: this.state.season2,
            gameweekNumber: this.state.gameweek1
        }
        try {
            await axios.post("http://localhost:5000/api/gameweek/", body)
            modal = <Alert severity="success">Successful Request</Alert>
            console.log(body);
        } catch(e) {
            console.log(e);
            modal = <Alert severity="error">This is an error alert — check console</Alert>
        }
        this.setState({ modal: modal })
    }

    async submitTeam() {
        let modal = "";
        const body = {
            seasonNumber: this.state.season3,
            gameweekNumber: this.state.gameweek2,
            teamName: this.state.teamName1,
            primaryColour: this.state.primaryColour
        }
        try {
            await axios.post("http://localhost:5000/api/team/", body)
            modal = <Alert severity="success">Successful Request</Alert>
            console.log(body);
        } catch(e) {
            console.log(e);
            modal = <Alert severity="error">This is an error alert — check console</Alert>
        }
    }

    async submitPlayer() {
        let modal = "";
        const body = {
            seasonNumber: this.state.season4,
            gameweekNumber: this.state.gameweek3,
            teamName: this.state.teamName2,
            firstName: this.state.firstName,
            lastName: this.state.secondName
        }
        try {
            await axios.post("http://localhost:5000/api/rateable_person/", body)
            modal = <Alert severity="success">Successful Request</Alert>
            console.log(body);
        } catch(e) {
            console.log(e);
            modal = <Alert severity="error">This is an error alert — check console</Alert>
        }
    }

    render() {
        return (
            <div>
                <p className="AdminText">ADMIN DASHBOARD</p>
                {this.state.modal}
                <div className="AdminButtons">
                <p>Add Season</p>
                <TextField id="standard-basic" label="Season Number" onChange={ e => this.setState({season1: e.target.value})} variant="standard" />
                <Button variant="contained" onClick={e => this.submitSeason()}>Submit</Button>

                <p>Add Gameweek</p>
                <TextField id="standard-basic" label="Season Number" variant="standard" onChange={ e => this.setState({season2: e.target.value})}/>
                <TextField id="standard-basic" label="Gameweek Number" variant="standard" onChange={ e => this.setState({gameweek1: e.target.value})}/>
                <Button variant="contained" onClick={e => this.submitGameweek()}>Submit</Button>

                <p>Add Team</p>
                <TextField id="standard-basic" label="Season Number" variant="standard" onChange={ e => this.setState({season3: e.target.value})}/>
                <TextField id="standard-basic" label="Gameweek Number" variant="standard" onChange={ e => this.setState({gameweek2: e.target.value})}/>
                <TextField id="standard-basic" label="Team Name" variant="standard" onChange={ e => this.setState({teamName1: e.target.value})}/>
                <TextField id="standard-basic" label="Primary Colour" variant="standard" onChange={ e => this.setState({primaryColour: e.target.value})}/>
                <Button variant="contained" onClick={e => this.submitTeam()}>Submit</Button>

                <p>Add Player</p>
                <TextField id="standard-basic" label="Season Number" variant="standard" onChange={ e => this.setState({season4: e.target.value})}/>
                <TextField id="standard-basic" label="Gameweek Number" variant="standard" onChange={ e => this.setState({gameweek3: e.target.value})}/>
                <TextField id="standard-basic" label="Team Name" variant="standard" onChange={ e => this.setState({teamName2: e.target.value})}/>
                <TextField id="standard-basic" label="First Name" variant="standard" onChange={ e => this.setState({firstName: e.target.value})}/>
                <TextField id="standard-basic" label="Second Name" variant="standard" onChange={ e => this.setState({secondName: e.target.value})}/>
                <Button variant="contained" onClick={e => this.submitPlayer()}>Submit</Button>
                </div>
            </div>
        );
    };
};

export default Admin;