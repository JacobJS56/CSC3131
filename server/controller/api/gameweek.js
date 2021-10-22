const express = require('express');
const router = express.Router();
const gameweekService = require('../../service/gameweekService');
const auth = require('../../middleware/auth');

// @route   POST api/gameweek
// @desc    Create a gameweek
// @access  Public
router.post('/', gameweekService.createGameweek );

// @route   GET api/all
// @desc    Get all gameweeks
// @access  Public
router.get('/all', gameweekService.getAllGameweeks );

// @route   GET api/gameweek/num/:gameweek_number
// @desc    Get gameweek by number
// @access  Public
router.get('/num/:gameweek_number', gameweekService.getGameweekByNumber );

// @route   POST api/gameweek/team
// @desc    Add teams to the gameweek teamMap
// @access  Public
router.post('/team', gameweekService.addTeamToGameweek );

module.exports = router;