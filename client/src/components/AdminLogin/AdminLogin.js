import React, { Component } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from "axios";
import Alert from '@mui/material/Alert';

import './AdminLogin.css';

class AdminLogin extends Component {
        constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            modal: ""
        }
        this.submit = this.submit.bind(this);
    }

    async submit() {
        let modal = "";
        const body = {
            email: this.state.email,
            password: this.state.password
        }
        try {
            const res = await axios.post("http://localhost:5000/api/admin/login", body)
            window.location.href='/admin'
        } catch(e) {
            console.log(e);
            modal = <Alert severity="error">Password Not Allowed</Alert>
        }
        this.setState({ modal: modal })
    }


    render() {
        return (
            <div >
                <p className="AdminText">ADMIN LOGIN</p>
                         {this.state.modal}
                <div className="MainBody">
                    <p>Email</p>
                    <TextField id="standard-basic" label="email" variant="standard" onChange={ e => this.setState({email: e.target.value})}/>
                    <p>Password</p>
                    <TextField id="standard-basic" label="password" variant="standard" onChange={ e => this.setState({password: e.target.value})}/>
                </div>
                <div className="ButtonSubmit">
                    <Button variant="contained" onClick={e => this.submit()}>Submit</Button>
                </div>
            </div>
        );
    };
};

export default AdminLogin;