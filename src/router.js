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

const ErrorBadRequest = 'username and password are required to login'
const ErrorInvalidCred = 'invalid username or password'
const ErrorUnAuth = 'unauthorized'

router.post('/login', (req, res) => {
    const {username, password} = req.body
    if(!username || !password) {
        return res.status(400).json({error: ErrorBadRequest})
    }
    if(username !== mockUser.username || password !== mockUser.password) {
        return res.status(401).json({error: ErrorInvalidCred})
    }
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
        return res.status(401).json({error: ErrorUnAuth})
    }
});

module.exports = router;
