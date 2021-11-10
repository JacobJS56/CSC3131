const express = require('express');
const router = express.Router();
const seasonService = require('../../service/seasonService');
const auth = require('../../middleware/auth');

// @route   POST api/season
// @desc    Create a season
// @access  Public
router.post('/', seasonService.createSeason );

// @route   GET api/all
// @desc    Get all season
// @access  Public
router.get('/all', seasonService.getAllSeasons );

// @route   GET api/season/num/:season_number
// @desc    Get season by number
// @access  Public
router.get('/', auth.seasonAuth, seasonService.getSeasonByNumber );

// @route   POST api/season/gameweek
// @desc    Add teams to the season teamMap
// @access  Public
router.post('/gameweek', auth.seasonAuth, seasonService.addGameweekToSeason );

// @route   DELETE api/season/delete
// @desc    Get season by id and delete them from the mongodb
// @access  Public
router.delete('/delete', auth.seasonAuth, seasonService.deleteSeasonById )


module.exports = router;