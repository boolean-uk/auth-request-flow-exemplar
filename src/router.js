const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const mockUser = {
    username: 'authguy',
    password: 'mypassword',
    profile: {
        firstName: 'Chris',
        lastName: 'Wolstenholme',
        age: 43
    }
};

const jwtSecret = 'super-secret'

router.post('/login', (req, res) => {
    const payload = {username: mockUser.username}
    const token = jwt.sign(payload , jwtSecret)
    res.status(200).json({token: token})
});

router.get('/profile', (req, res) => {
    try{
        let token = req.headers.authorization
        token = token.replace('Bearer ', '')
        jwt.verify(token, jwtSecret)
        res.json({ profile: mockUser.profile });
    }catch(err) {
        console.error(err)
        return res.status(401).json({error: 'unauthorized'})
    }
});

module.exports = router;
