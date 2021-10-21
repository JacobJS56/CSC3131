const express = require('express');
const Gameweek = require('../models/Gameweek');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const createGameweek = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()});
    }

    let { gameweek, teamMap } = req.body;

    try {
        // See if gameweek exists
        //let gameweek = await Gameweek.findOne({gameweek});
        
        /*if(gameweek) {
            return res.status(400).json({errors:[{msg:'Gameweek already exists'}]});
        }*/

        gameweek = new Gameweek({
            gameweek,
            teamMap,
        });

        await gameweek.save();

        // Return jsonwebtoken
        const payload = {
            gameweek: {
                id: gameweek.id
            }
        }

        jwt.sign(
            payload, 
            config.get('jwtSecret'),
            { expiresIn: 360000 },
            ( err, token ) => {
                if(err) throw err;
                res.json({ token });
        });

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

module.exports = {
    createGameweek,
};