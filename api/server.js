const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../users/authenticate-middleware.js');
const authRouter = require('../users/user-router.js');
const potluckRouter = require('../potlucks/potluck-router');
const potluckUserRouter = require('../users/potluck-user-router');
const foodsRouter = require('../food/food-router');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ message: 'server up and running'});
});

server.use('/api/', authRouter);
server.use(authenticate);
server.use('/potlucks', potluckRouter);
server.use('/users', potluckUserRouter);
server.use('/food', foodsRouter);

module.exports = server;