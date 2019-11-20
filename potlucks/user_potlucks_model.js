const db = require('../data/db-config');

const find = () => {
  return db('user_potlucks');
};

const findBy = (user_id, potluck_id) => {
  return db('user_potlucks').where({user_id, potluck_id}).first();
};

const add = (data) => {
  return db('user_potlucks').insert(data)
    .then(ids => {
      console.log(ids);
      return findBy(data.user_id, data.potluck_id);
    })
};

const update = (user_id, potluck_id) => {
  return db('user_potlucks').where({user_id, potluck_id}).update({accepted: 1});
};

const remove = (user_id, potluck_id) => {
  return db('user_potlucks').where({user_id, potluck_id}).del();
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
  findBy,
  add,
  update,
  remove,
  findAllAttendees
};

