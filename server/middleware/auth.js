const jwt = require('jsonwebtoken');
const config = require('config');

const auth = (req, res, next) => {
    // get token from header
    const token = req.header('x-auth-token');

    // check if not token 
    if(!token) {
        return res.status(401).json({msg:'No Token, authorization denied'});
    }

    // verify token
    try {
        const decoded = jwt.verify(token, config.get("jwtSecret"));
        req.entity = decoded.entity;

        next();
    } catch(err) {
        res.status(401).json({msg:'Token is not valid'});
    }

}

const seasonAuth = (req, res, next) => {
    auth(req, res, next, req.season);
}

const rateablePersonAuth = (req, res, next) => {
    // get token from header
    const token = req.header('x-auth-token');

    // check if not token 
    if(!token) {
        return res.status(401).json({msg:'No Token, authorization denied'});
    }

    // verify token
    try {
        const decoded = jwt.verify(token, config.get("jwtSecret"));
        req.rateablePerson = decoded.rateablePerson;

        next();
    } catch(err) {
        res.status(401).json({msg:'Token is not valid'});
    }

}

const teamAuth = (req, res, next) => {
    // get token from header
    const token = req.header('x-auth-token');

    // check if not token 
    if(!token) {
        return res.status(401).json({msg:'No Token, authorization denied'});
    }

    // verify token
    try {
        const decoded = jwt.verify(token, config.get("jwtSecret"));
        req.team = decoded.team;
        next();
    } catch(err) {
        res.status(401).json({msg:'Token is not valid'});
    }

}

const gameweekAuth = (req, res, next) => {
    // get token from header
    const token = req.header('x-auth-token');

    // check if not token 
    if(!token) {
        return res.status(401).json({msg:'No Token, authorization denied'});
    }

    // verify token
    try {
        const decoded = jwt.verify(token, config.get("jwtSecret"));
        req.gameweek = decoded.gameweek;
        next();
    } catch(err) {
        res.status(401).json({msg:'Token is not valid'});
    }

}

module.exports = {
    seasonAuth,
    rateablePersonAuth,
    teamAuth,
    gameweekAuth
};