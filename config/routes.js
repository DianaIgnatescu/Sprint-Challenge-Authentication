const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('../database/dbConfig');

const { authenticate, jwtKey } = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  // implement user registration
  const { username, password } = req.body;
  let user = req.body;
  const hashedPw = bcrypt.hashSync(user.password, 10);
  user.password = hashedPw;
  if (!username || !password) {
    res.status(400).json({ errorMessage: 'Missing username or password.'})
  } else {
    db('users').insert(user)
      .then(arrayOfIds => {
        return db('users').where({ id: arrayOfIds[0] });
      })
      .then(arrayOfUsers => {
        res.status(201).json(arrayOfUsers[0])
      })
      .catch((error) => {
        res.status(500).json({ errorMessage: 'The user could not be created.' });
      })
  }
}

const generateToken = (user) => {
  const payload = {
    subject: user.id,
    username: user.username,
  };
  const options = {
    expiresIn: '1h',
  };
  const token = jwt.sign(payload, jwtKey, options);
  return token;
};

function login(req, res) {
  // implement user login
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
