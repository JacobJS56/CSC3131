const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('config');
const { validationResult } = require('express-validator');

const createAdmin = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()});
    }

    const { email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10)

        // See if season exists
        let newAdmin = await Admin.findOne({email});
        if(newAdmin) return res.status(400).json({errors:[{msg:'Admin already exists'}]});

        // Create new one if not and save
        newAdmin = new Admin({
             email, password: hashedPassword 
        });
        await newAdmin.save();

        // Return jsonwebtoken
        const payload = {
            admin: {
                email: email,
                password: hashedPassword
            }
        }

        // Sign with secret
        jwt.sign(
            payload, 
            config.get('jwtSecret'),
            { expiresIn: 360000 },
            ( err, token ) => {
                if(err) throw err;
                res.status(200).json({ token });
        });
    } catch(err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

const login = async (req, res) => {
    const user = await Admin.findOne({email: req.body.email})
    if(user == null) {
        return res.status(400).send('Cannot find user')
    }
    try{
        console.log(user)
        const b = await bcrypt.compare(req.body.password, user.password)
        if(b) {
            res.send("Success")
        }
        throw new Error()
    } catch(e) {
        console.log(e)
        res.status(500).send()
    }
};

module.exports = {
    createAdmin,
    login
};