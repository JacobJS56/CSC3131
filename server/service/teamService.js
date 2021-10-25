const Team = require('../models/Team');
const jwt = require('jsonwebtoken');
const config = require('config');
const { validationResult } = require('express-validator');

const createTeam = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({ error: errors.array()});

    const { teamName, rating, rateablePersonList } = req.body;
    
    try {
        // See if rateablePerson exists
        let rateablePerson = await RateablePerson.findOne({teamName});
        if(rateablePerson) return res.status(400).json({errors:[{msg:'Team already exists'}]});

        // Create new one if not and save
        team = new Team({
            teamName, rating, rateablePersonList
        });
        await team.save();

        // Return jsonwebtoken
        const payload = {
            team: {
                id: team.id
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

const getAllTeams = async (req, res) => {
    /**************** figure out why we only populate with firstName */
    Team.find()
        .populate("teamName")
        .then(team => res.json(team))
        .catch(err => {
            res.status(404).json('There are no teams')
        })
};

const getTeamById = async (req, res) => {
    Team.findById(req.team.id)
    .then(team => res.json(team))
    .catch(err => {
        console.log(err.message);
        res.status(404).json({ team: 'A Team with that ID does not exist' });});
};

const calculateRating = async (req, res) => {
    Team.findById(req.team.id)
    .then(team => {
        let rating = 0;
        team.rateablePersonList.forEach(rateablePerson => {
            rating = rating + rateablePerson.rating;
        });
        res.json(rating);
    })
    .catch(err => {
        console.log(err.message);
        res.status(404).json({ team: 'A Team with that ID does not exist' });});
};

const deleteTeamById = async (req, res) => {
    Team.findById(req.team.id)
    .then(team => {
        team.delete();
        res.status(200).json("Deleted Team");
    })
    .catch(err => {
        console.log(err.message);
        res.status(404).json({ rateablePerson: 'A Team with that ID does not exist' });});
};

module.exports = {
    createTeam,
    getAllTeams,
    getTeamById,
    calculateRating,
    deleteTeamById
};