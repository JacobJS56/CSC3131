const RateablePerson = require('../models/RateablePerson');
const jwt = require('jsonwebtoken');
const config = require('config');
const { validationResult } = require('express-validator');

const createRateablePerson = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()});
    }

    const { firstName, lastName, rating, numOfRatings, team } = req.body;

    try {
        // See if gameweek exists
        
        //********************* */ need a unique way of identfying
        let rateablePerson = await RateablePerson.findOne({firstName});
        if(rateablePerson) return res.status(400).json({errors:[{msg:'RateablePerson already exists'}]});

        // Create new one if not and save
        rateablePerson = new RateablePerson({
            firstName,
            lastName,
            rating,
            numOfRatings,
            team
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

module.exports = {
    createRateablePerson,
    getAllRateablePersons,
    getRateablePersonById
};