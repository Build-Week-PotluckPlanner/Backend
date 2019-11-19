const db = require('../data/db-config');

const find = () => {
  return db('user_potlucks');
};

const findById = (id) => {
  return db('user_potlucks').where({id}).first();
};

const add = (data) => {
  return db('user_potlucks').insert(data)
    .then(ids => {
      console.log(ids);
      return findById(ids[0]);
    })
};

const getMax = () => {
  return db('user_potlucks').max('user_id');
};

const getCount = () => {
  return db('user_potlucks').count('user_id').first();
};

const update = (id) => {
  return db('user_potlucks').where({id}).update({accepted: 1});
};

const remove = (id) => {
  return db('user_potlucks').where({id}).del();
};

const findAllAttendees = (id) => {
  return db.from('users')
    .innerJoin('user_potlucks', 'user_potlucks.user_id', 'users.id')
    .innerJoin('potlucks', 'user_potlucks.potluck_id', 'potlucks.id')
    .select('users.firstName', 'users.lastName', 'potlucks.name')
    .where({ accepted: 1, potluck_id: id })

  // SQL QUERY 
  // SELECT users.firstName, users.lastName, potlucks.name, potlucks.location, potlucks.date, potlucks.time 
  // FROM users
  // INNER JOIN user_potlucks
  // ON user_potlucks.user_id = users.id
  // INNER JOIN potlucks 
  // ON user_potlucks.potluck_id = potlucks.id
  // WHERE accepted = 1 AND potluck_id = 4;

};

module.exports = {
  find, 
  findById,
  add,
  getMax,
  getCount,
  update,
  remove,
  findAllAttendees
};

