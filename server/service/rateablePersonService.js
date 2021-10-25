const RateablePerson = require('../models/RateablePerson');
const jwt = require('jsonwebtoken');
const config = require('config');
const { validationResult } = require('express-validator');

const createRateablePerson = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({ error: errors.array()});

    const { firstName, lastName, rating, ratingList, numOfRatings, teamName, teamId } = req.body;
    
    try {
        // See if rateablePerson exists
        //********************* */ need a unique way of identfying
        let rateablePerson = await RateablePerson.findOne({firstName, lastName, teamId});
        if(rateablePerson) return res.status(400).json({errors:[{msg:'RateablePerson already exists'}]});

        // Create new one if not and save
        rateablePerson = new RateablePerson({
            firstName,
            lastName,
            rating,
            ratingList,
            numOfRatings,
            teamName,
            teamId
        });
        await rateablePerson.save();

        // Return jsonwebtoken
        const payload = {
            rateablePerson: {
                id: rateablePerson.id
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

const getAllRateablePersons = async (req, res) => {
    /**************** figure out why we only populate with firstName */
    RateablePerson.find()
        .populate("firstName")
        .then(rateablePersons => res.json(rateablePersons))
        .catch(err => {
            res.status(404).json('There are no rateablePersons')
        })
};

const getRateablePersonById = async (req, res) => {
    RateablePerson.findById(req.rateablePerson.id)
    .then(rateablePerson => res.json(rateablePerson))
    .catch(err => {
        console.log(err.message);
        res.status(404).json({ rateablePerson: 'A RateablePerson with that number does not exist' });});
};

const calculateRating = async (req, res) => {
    RateablePerson.findById(req.rateablePerson.id)
    .then(rateablePerson => {
        rateablePerson.ratingList.push(req.body.rating)
        rateablePerson.numOfRatings = rateablePerson.ratingList.length;

        const sum = rateablePerson.ratingList.reduce((a, b) => a + b, 0);
        const rating = (sum / rateablePerson.ratingList.length) || 0;

        rateablePerson.rating = rating.toFixed(2);
        rateablePerson.save();

        res.json(rateablePerson);
    })
    .catch(err => {
        console.log(err.message);
        res.status(404).json({ rateablePerson: 'A RateablePerson with that number does not exist' });});
};

const addTeam = async (req, res) => {
    RateablePerson.findById(req.rateablePerson.id)
    .then(rateablePerson => {
        rateablePerson.teamId = req.body.teamId;
        rateablePerson.teamName = req.body.teamName;
        rateablePerson.save();
        res.json(rateablePerson);
    })
    .catch(err => {
        console.log(err.message);
        res.status(404).json({ rateablePerson: 'A RateablePerson with that number does not exist' });});
};

const deleteRateablePersonById = async (req, res) => {
    RateablePerson.findById(req.rateablePerson.id)
    .then(rateablePerson => {
        rateablePerson.delete();
        res.status(200).json("Deleted RelateablePerson");
    })
    .catch(err => {
        console.log(err.message);
        res.status(404).json({ rateablePerson: 'A RateablePerson with that number does not exist' });});
};

module.exports = {
    createRateablePerson,
    getAllRateablePersons,
    getRateablePersonById,
    calculateRating,
    addTeam,
    deleteRateablePersonById
};