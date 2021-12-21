const Gameweek = require('../models/Gameweek');
const Season = require('../models/Season');
const Team = require('../models/Team');
const jwt = require('jsonwebtoken');
const config = require('config');
const { validationResult } = require('express-validator');


// Service for Gameweek

const createGameweek = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()});
    }

    const { seasonNumber, gameweekNumber } = req.body;

    try {
        // See if season exists
        let season = await Season.findOne({seasonNumber});
        if(!season) return res.status(400).json({errors:[{msg:'Season doesnt exist'}]});
        
        // See if gameweek exists with specific season
        let gameweek = await Gameweek.findOne({seasonNumber, gameweekNumber});
        if(gameweek) {return res.status(400).json({errors:[{msg:'Gameweek already exists'}]})};

        // Create new one if not and save
        gameweek = new Gameweek({
            seasonNumber,
            gameweekNumber,
        });

        if(season !=  null) {
            if(season.gameweekList == undefined) {
                season.gameweekList = [gameweek];
            } else {
                season.gameweekList.push(gameweek);
            }
        };
        
        await season.save();
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

const getAllTeams = async (req, res) => {
    Gameweek.findOne({ gameweekNumber: req.params.gameweek_number })
    .populate('gameweekNumber')
    .then(async gameweek => {
        teamArray = []

        for(let i = 0; i < gameweek.teamList.length; i++) {
            const team = await Team.findById(gameweek.teamList[i])
            await teamArray.push(team)
        }
        console.log(teamArray)
        await res.json(teamArray)
    })
    .catch(err => {
        console.log(err);
        res.status(404).json({ gameweek: 'A gameweek with that name does not exist' });
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

const deleteGameweekById = async (req, res) => {
    Gameweek.findById(req.gameweek.id)
    .then(gameweek => {
        gameweek.delete();
        res.status(200).json("Deleted Gameweek");
    })
    .catch(err => {
        console.log(err.message);
        res.status(404).json({ gameweek: 'A Gameweek with that ID does not exist' });});
};


module.exports = {
    createGameweek,
    getAllGameweeks,
    getGameweekByNumber,
    getAllTeams,
    addTeamToGameweek,
    deleteGameweekById
};