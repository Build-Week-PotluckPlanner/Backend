const router = require('express').Router();
const bcrypt = require("bcryptjs"); // npm i bcryptjs
const User = require("./user-model");
const jwt = require('jsonwebtoken');
//const requiresAuth = require("./authenticate-middleware");

function generateToken(user) {
  const payload = {
    username: user.username,
    id: user.id,
  };
  const options = {
    expiresIn: '1d',
  };
  return jwt.sign(payload, process.env.JWT_SECRET || 'lkajsdlkjaskldj', options);
}

router.post('/register', validateUserInfo, (req, res) => {
  // implement registration
  let userInformation = req.body;
  //   bcrypt.hash(userInformation.password, 12, (err, hashedPasswod) => {
  //     userInformation.password = hashedPasswod;
  const hash = bcrypt.hashSync(userInformation.password, 12);
  userInformation.password = hash;
  User
    .add(userInformation)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  // implement login
  let { username, password } = req.body;
  User
    .findBy({ username })
    .first()
    .then(user => {
      // check that the password is valid
      if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user);
        res.status(200).json({
            message: `Welcome ${user.username}!`,
            token
            });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      console.log("login error", error);
      res.status(500).json(error);
    });
});

router.get('/', (req, res) => {
  User
    .find()
      .then(users => res.status(200).json(users))
      .catch(err => {
        console.log(err);
        res.status(500).json({error: 'The users information could not be retrieved.'})
      });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  User
    .findById(id)
      .then(([user]) => {
            console.log(user);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({error: `This user id:${id} does not exist`})
            }
      });
});



function validateUserInfo(req, res, next) {
  if(!req.body.username || !req.body.password || !req.body.first_name || !req.body.last_name) {
    res.status(400).send({message: 'Username, password, first name and last name are required.'});
  } else {
    next();
  }
};

module.exports = router;