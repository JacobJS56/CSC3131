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


module.exports = router;