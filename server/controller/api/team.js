const express = require('express');
const router = express.Router();
const teamService = require('../../service/teamService');
const auth = require('../../middleware/auth');

// @route   POST api/team
// @desc    Create a team
// @access  Public
router.post('/', teamService.createTeam );

// @route   GET api/all
// @desc    Get all rateablePersons
// @access  Public
router.get('/all', teamService.getAllTeams );

// @route   GET api/team
// @desc    Get rateablePerson by id
// @access  Public
router.get('/', auth.teamAuth, teamService.getTeamById );

// @route   POST api/team/rating
// @desc    Get rateablePerson by id and calculate rating
// @access  Public
router.post('/rating', auth.teamAuth, teamService.calculateRating );

// @route   DELETE api/team/delete
// @desc    Get rateablePerson by id and delete them from the mongodb
// @access  Public
router.delete('/delete', auth.teamAuth, teamService.deleteTeamById )

module.exports = router;