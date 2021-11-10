import React, { Component } from 'react';

import './GenericPage.css';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

class GenericPage extends Component {
        constructor(props) {
        super(props);

        this.state = {
        }
    }

    render() {
        return (
            <div>
                <div className="Banner">
                    <p className="FansText">FANS</p>
                    <p className="OpinionText">OPINION</p>
                </div>
                <div className="Nav">
                    <Stack spacing={2} direction="row">
                        <Button className="Button" style={{ 
                            maxWidth: '5rem', maxHeight: '5rem', minWidth: '5rem', minHeight: '5rem', fontSize: '1.5rem',color: "grey"
                         }} variant="text">ADMIN</Button>
                        <Button className="Button" style={{ 
                            maxWidth: '5rem', maxHeight: '5rem', minWidth: '5rem', minHeight: '5rem', fontSize: '1.5rem',color: "grey"
                         }} variant="text">HOME</Button>
                    </Stack>
                </div>
            </div>
        );
    };
};

export default GenericPage;