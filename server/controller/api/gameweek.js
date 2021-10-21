const express = require('express');
const router = express.Router();
const gameweekService = require('../../service/gameweekService');
const auth = require('../../middleware/auth');

// @route   POST api/gameweek
// @desc    Create a gameweek
// @access  Public
router.post('/', gameweekService.createGameweek);

// @route   GET api/all
// @desc    Get all gameweeks
// @access  Public
//router.get('/all', gameweekService.getAllGameweeks);

// @route   GET api/gameweek/id
// @desc    Get all gameweeks
// @access  Public
//router.get('/gameweek/id', gameweekService.createGameweek);


module.exports = router;