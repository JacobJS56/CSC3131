const express = require('express');
const router = express.Router();
const teamService = require('../../service/teamService');

// @route   POST api/team
// @desc    Create a team
// @access  Public
router.post('/', teamService.createTeam );

// @route   GET api/all
// @desc    Get all teams
// @access  Public
router.get('/all', teamService.getAllTeams );

// @route   GET api/team
// @desc    Get team by id
// @access  Public
router.get('/:team_id', teamService.getTeamById );

// @route   GET api/team/rateable_persons/:team_name
// @desc    Get all team rateablePersons
// @access  Public
router.get('/rateable_persons/:team_name', teamService.getAllRateablePerson )

// @route   POST api/team/rating
// @desc    Get team by id and calculate rating
// @access  Public
router.get('/rating', teamService.calculateRating );

// @route   DELETE api/team/delete
// @desc    Get team by id and delete from the mongodb
// @access  Public
router.delete('/delete', teamService.deleteTeamById )

module.exports = router;