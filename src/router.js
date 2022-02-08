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

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username !== mockUser.username || password !== mockUser.password) {
        return res.status(401).json({ error: 'Invalid username or password.' });
    }

    const token = jwt.sign({ username }, jwtSecret);

    res.json({ data: token });
});

router.get('/profile', (req, res) => {
    try {
        const token = req.header('authorization');
        jwt.verify(token, jwtSecret);
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token provided.' });
    }

    res.json({ data: mockUser.profile });
});

module.exports = router;
