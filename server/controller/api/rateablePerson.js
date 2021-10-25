const express = require('express');
const router = express.Router();
const rateablePersonService = require('../../service/rateablePersonService');
const auth = require('../../middleware/auth');

// @route   POST api/rateablePerson
// @desc    Create a rateablePerson
// @access  Public
router.post('/', rateablePersonService.createRateablePerson );

// @route   GET api/all
// @desc    Get all rateablePersons
// @access  Public
router.get('/all', rateablePersonService.getAllRateablePersons );

// @route   GET api/rateablePerson
// @desc    Get rateablePerson by id
// @access  Public
router.get('/', auth.rateablePersonAuth, rateablePersonService.getRateablePersonById );

// @route   POST api/rateablePerson/rating
// @desc    Get rateablePerson by id and calculate rating
// @access  Public
router.post('/rating', auth.rateablePersonAuth, rateablePersonService.calculateRating );

// @route   POST api/rateablePerson/add_team
// @desc    Get rateablePerson by id and add a team id
// @access  Public
router.post('/team', auth.rateablePersonAuth, rateablePersonService.addTeam );

// @route   DELETE api/rateablePerson/delete
// @desc    Get rateablePerson by id and delete them from the mongodb
// @access  Public
router.delete('/delete', auth.rateablePersonAuth, rateablePersonService.deleteRateablePersonById )

module.exports = router;