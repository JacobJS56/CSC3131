const Team = require('../models/Team');
const RateablePerson = require('../models/RateablePerson');
const jwt = require('jsonwebtoken');
const config = require('config');
const { validationResult } = require('express-validator');
const { ObjectId } = require('mongodb');

const createTeam = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({ error: errors.array()});
    
    let rateablePersonList = [];
    console.log(req.body)
    const { seasonNumber, gameweekNumber, teamName, rating, primaryColour } = req.body;
    
    try {
        // See if team exists
        let team = await Team.findOne({teamName});
        if(team) return res.status(400).json({errors:[{msg:'Team already exists'}]});

        // See if gameweek exists with specific season
        let gameweek = await Gameweek.findOne({seasonNumber, gameweekNumber});

        // Create new one if not and save
        team = new Team({
            seasonNumber, gameweekNumber, teamName, rateablePersonList, rating, primaryColour
        });

        if(gameweek !=  null) {
            if(gameweek.teamList == undefined) {
                gameweek.teamList  = [team];
            } else {
                gameweek.teamList .push(team);
            }
        };

        await gameweek.save();
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

const getAllRateablePerson = async (req, res) => {
    Team.findOne({ seasonNumber: req.params.season_num, gameweekNumber: req.params.gameweek_num, teamName: req.params.team_name })
    .populate('teamName')
    .then(async team => {
        rateableArray = []

        for(let i = 0; i < team.rateablePersonList.length; i++) {
            const rateablePerson = await RateablePerson.findById(team.rateablePersonList[i])
            await rateableArray.push(rateablePerson)
        }

        console.log(rateableArray)
        await res.json(rateableArray)
    })
    .catch(err => {
        console.log(err);
        res.status(404).json({ team: 'A team with that name does not exist' });
    });
};

const saveRating = async (team) => {
    let rating = 0;
    let array = [];

    await team.rateablePersonList.forEach(async rateablePerson => {
        //await RateablePerson.findById(String(rateablePerson._id)).then(async rp => {
            array.push(RateablePerson.findById(rateablePerson.id));
        //});
    });

    //rating = rp.rating;
    //team.rating = rating;
    console.log(array);
    //await team.save();

    return rating;
};

const getRating = async (req, res) => {
    const team = await Team.findOne({ seasonNumber: req.params.season_num, gameweekNumber: req.params.gameweek_num, teamName: req.params.team_name })

    const rating = await saveRating(team);

    res.json(rating);    
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
    getAllRateablePerson,
    getRating,
    deleteTeamById
};