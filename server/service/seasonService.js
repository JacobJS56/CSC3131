const Season = require('../models/Season');
const Gameweek = require('../models/Gameweek');
const jwt = require('jsonwebtoken');
const config = require('config');
const { validationResult } = require('express-validator');

const createSeason = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()});
    }

    const { seasonNumber, seasonList } = req.body;

    try {
        // See if season exists
        let season = await Season.findOne({seasonNumber});
        if(season) return res.status(400).json({errors:[{msg:'Season already exists'}]});

        // Create new one if not and save
        season = new Season({
            seasonNumber,
            seasonList,
        });
        await season.save();

        // Return jsonwebtoken
        const payload = {
            season: {
                id: season.id
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

const getAllSeasons = async (req, res) => {
    Season.find()
      .populate('seasonNumber')
      .then(seasons => res.json(seasons))
      .catch(err => {
          res.status(404).json({ season: 'There are no seasons' });});
};

const getSeasonByNumber = async (req, res) => {
    Season.findById(req.season.id)
      .then(season => res.json(season))
      .catch(err => {
          console.log(err.message);
          res.status(404).json({ season: 'A season with that number does not exist' });});
};

const addGameweekToSeason = async (req, res) => {
    //const errors = validationResult(req);
    // Check Validation
    //if (!isValid) return res.status(400).json(errors);
    Season.findById(req.season.id)
    .then(season => {
        //if there are teams save them
        let newGameweekList = [];

        if(req.body.teamList.length > 0) req.body.teamList.forEach(team => {
            team = new Team(team);
            team.save();
            newGameweekList.push(team);
        });

        newGameweek = new Gameweek({
            season: season.seasonNumber,
            gameweekNumber: req.body.gameweekNumber,
            teamList: newGameweekList,
        });
    
        // Add to gameweekList
        season.gameweekList.push(newGameweek);

        //save gameweek to database
        newGameweek.save();

        //if there are rateablepersons save them

        // update season object
        season.save().then(season => res.json(season));
    })
    .catch(err => {
        console.log(err);
        res.status(404).json({ season: 'A season with that number does not exist' });
    });
};

module.exports = {
    createSeason,
    getAllSeasons,
    getSeasonByNumber,
    addGameweekToSeason
};