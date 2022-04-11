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

module.exports = router;
