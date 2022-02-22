const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const jwtSecret = 'mysecretkey';
const mockUser = {
    username: 'authguy',
    password: 'mypassword',
    profile: {
        firstName: 'Chris',
        lastName: 'Wolstenholme',
        age: 43
    }
};

router.post('/login', (req, res, next) => {
    const { username, password } = req.body;

    if (username !== mockUser.username || password !== mockUser.password) {
        
        const err = new Error('Invalid username or password');
        err.status = 'Fail';
        err.statusCode = 404;
        next(err);

    } else {

        const token = jwt.sign({ username }, jwtSecret);
        res.json({ data: token });

    }
});

router.get('/profile', (req, res, next) => {
    
    try {

        const token = req.header('authorization');
        jwt.verify(token, jwtSecret);
        res.json({ data: mockUser.profile });

    } catch (error) {

        const err = new Error('Invalid token provided');
        err.status = 'Fail';
        err.statusCode = 401;
        next(err)
    }
});

module.exports = router;
