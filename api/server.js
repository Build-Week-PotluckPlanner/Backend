const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../users/authenticate-middleware.js');
const authRouter = require('../users/user-router.js');
const potluckRouter = require('../potlucks/potluck-router');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/', authRouter);
server.use(authenticate);
server.use('/potlucks', potluckRouter);

server.get('/', (req, res) => {
    res.status(200).json({ message: 'server up and running'});
});

module.exports = server;