const Gameweek = require('../models/Gameweek');
const Team = require('../models/Team');
const jwt = require('jsonwebtoken');
const config = require('config');
const { validationResult } = require('express-validator');

const createGameweek = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()});
    }

    const { gameweekNumber, teamMap } = req.body;

    try {
        // See if gameweek exists
        let gameweek = await Gameweek.findOne({gameweekNumber});
        if(gameweek) return res.status(400).json({errors:[{msg:'Gameweek already exists'}]});

        // Create new one if not and save
        gameweek = new Gameweek({
            gameweekNumber,
            teamMap,
        });
        await gameweek.save();

        // Return jsonwebtoken
        const payload = {
            gameweek: {
                id: gameweek.id
            }
        }

        // Sign with secret
        jwt.sign(
            payload, 
            config.get('jwtSecret'),
            { expiresIn: 360000 },
            ( err, token ) => {
                if(err) throw err;
                res.json({ token });
        });

    } catch(err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

const getAllGameweeks = async (req, res) => {
    Gameweek.find()
      .populate('gameweekNumber')
      .then(gameweeks => res.json(gameweeks))
      .catch(err => {
          res.status(404).json({ gameweek: 'There are no gameweeks' });});
};

const getGameweekByNumber = async (req, res) => {
    Gameweek.findOne({ gameweekNumber: req.params.gameweek_number })
      .populate('gameweekNumber')
      .then(gameweek => res.json(gameweek))
      .catch(err => {
          console.log(err);
          res.status(404).json({ gameweek: 'A gameweek with that number does not exist' });});
};

const addTeamToGameweek = async (req, res) => {
    //const errors = validationResult(req);
    // Check Validation
    //if (!isValid) return res.status(400).json(errors);
    Gameweek.findOne({ gameweek: req.body.gameweekNumber }).then(gameweek => {
        newTeam = new Team({
            teamName: req.body.teamName,
        });
    
        // Add to teamMap
        gameweek.teamList.push(newTeam);
        // save the new team to DB
        newTeam.save();
        // update gameweek
        gameweek.save().then(gameweek => res.json(gameweek));
    });
}

module.exports = {
    createGameweek,
    getAllGameweeks,
    getGameweekByNumber,
    addTeamToGameweek
};