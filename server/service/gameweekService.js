const Gameweek = require('../models/Gameweek');
const Season = require('../models/Season');
const Team = require('../models/Team');
const jwt = require('jsonwebtoken');
const config = require('config');
const { validationResult } = require('express-validator');

const createGameweek = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()});
    }

    const { seasonNumber, gameweekNumber, teamMap } = req.body;

    try {
        // See if season exists
        let season = await Season.findOne({seasonNumber});
        console.log(season);
        if(!season) return res.status(400).json({errors:[{msg:'Season doesnt exist'}]});
        
        // See if gameweek exists with specific season
        let gameweek = await Gameweek.findOne({seasonNumber, gameweekNumber});
        if(gameweek) {return res.status(400).json({errors:[{msg:'Gameweek already exists'}]})};

        // Create new one if not and save
        gameweek = new Gameweek({
            seasonNumber,
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
          res.status(404).json({ gameweek: 'A gameweek with that number does not exist' });
    });
};

const addTeamToGameweek = async (req, res) => {
    Gameweek.findById(req.gameweek.id)
    .then(async gameweek => {
        let team = await Team.findOne({teamName: req.body.teamName});
        
        if(team.teamName == null) res.status(404).json("bad request team does not exist");

        // Add to gameweekList
        gameweek.teamList.push(team);

        // update season object
        gameweek.save().then(gameweek => res.json(gameweek));
    })
    .catch(err => {
        console.log(err);
        res.status(404).json({ season: 'A season with that number does not exist' });
    });
}

module.exports = {
    createGameweek,
    getAllGameweeks,
    getGameweekByNumber,
    addTeamToGameweek
};