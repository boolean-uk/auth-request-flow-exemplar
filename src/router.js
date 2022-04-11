const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const mockUser = {
  username: 'authguy',
  password: 'mypassword',
  profile: {
    firstName: 'Chris',
    lastName: 'Wolstenholme',
    age: 43,
  },
};

const secretKey = 'mysecretkey';

router.post('/login', (req, res) => {
  const payload = mockUser.username;
  const token = jwt.sign(payload, secretKey);
  return res.json({ token });
});

router.get('/profile', (req, res) => {
  try {
    const token = req.headers.authorization.substring(7);
    const decoded = jwt.verify(token, secretKey);
    res.json({ decoded });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ err });
  }
});

module.exports = router;
