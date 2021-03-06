const Season = require('../models/Season');
const Gameweek = require('../models/Gameweek');
const jwt = require('jsonwebtoken');
const config = require('config');
const { validationResult } = require('express-validator');

// Service for Season 

const createSeason = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()});
    }
    console.log(req.body)
    const { seasonNumber } = req.body;

    try {
        // See if season exists
        let season = await Season.findOne({seasonNumber});
        if(season) return res.status(400).json({errors:[{msg:'Season already exists'}]});

        // Create new one if not and save
        season = new Season({
            seasonNumber,
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
                res.status(200).json({ token });
        });

    } catch(err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

const getAllSeasons = async (req, res) => {
    Season.find()
      .populate('seasonNumber')
      .then(seasons => {
          res.status(200).json(seasons)
        })
      .catch(err => {
          res.status(404).json({ season: 'There are no seasons' });});
};

const getSeasonByNumber = async (req, res) => {
    Season.findOne({ seasonNumber: req.params.season_number })
    .populate('seasonNumber')
    .then(season => res.status(200).json(season))
    .catch(err => {
        console.log(err);
        res.status(404).json({ season: 'A season with that number does not exist' });
  });
};

const addGameweekToSeason = async (req, res) => {
    Season.findById(req.season.id)
    .then(async season => {
        let gameweek = await Gameweek.findOne({gameweekNumber: req.body.gameweekNumber});
        
        if(gameweek.gameweekNumber == null) res.status(404).json("bad request gameweek does not exist");

        // Add to gameweekList
        season.gameweekList.push(gameweek);

        // update season object
        season.save().then(season => res.json(season));
    })
    .catch(err => {
        console.log(err);
        res.status(404).json({ season: 'A season with that number does not exist' });
    });
};

const deleteSeasonById = async (req, res) => {
    Season.findById(req.season.id)
    .then(season => {
        season.delete();
        res.status(200);
    })
    .catch(err => {
        console.log(err.message);
        res.status(404).json({ season: 'A Season with that ID does not exist' });});
};


module.exports = {
    createSeason,
    getAllSeasons,
    getSeasonByNumber,
    addGameweekToSeason,
    deleteSeasonById
};