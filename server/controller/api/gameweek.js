const express = require('express');
const router = express.Router();
const gameweekService = require('../../service/gameweekService');
const auth = require('../../middleware/auth');

// @route   POST api/gameweek
// @desc    Create a gameweek
// @access  Public
router.post('/', gameweekService.createGameweek );

// @route   GET api/gameweek/all
// @desc    Get all gameweeks
// @access  Public
router.get('/all', gameweekService.getAllGameweeks );

// @route   GET api/gameweek/num/:gameweek_number
// @desc    Get gameweek by number
// @access  Public
router.get('/num/:gameweek_number', gameweekService.getGameweekByNumber );

// @route   GET api/gameweek/team/:gameweek_number
// @desc    Get all teams in gameweek
// @access  Public
router.get('/team/:gameweek_number', gameweekService.getAllTeams );

// @route   POST api/gameweek/team
// @desc    Add teams to the gameweek teamMap
// @access  Public
router.post('/team', auth.gameweekAuth, gameweekService.addTeamToGameweek );

// @route   DELETE api/gameweek/delete
// @desc    Get gameweek by id and delete them from the mongodb
// @access  Public
router.delete('/delete', auth.gameweekAuth, gameweekService.deleteGameweekById )


module.exports = router;