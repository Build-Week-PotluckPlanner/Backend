const db = require('../data/db-config');

const find = () => {
  return db('potlucks');
};

const findById = (id) => {
  return db('potlucks').where({id});
};

const add = (potluckData) => {
  return db('potlucks').insert(potluckData, 'id')
    .then(ids => {
      console.log(ids);
      return findById(ids[0]);
    })
};

const update = (changes, id) => {
  return db('potlucks')
    .where({id})
    .update(changes)
    .then(count => {
      console.log(count);
      return findById(id);
    })
};

const remove = (id) => {
  return db('potlucks')
    .where({id})
    .del()
};

const findDetailsById = (id) => {
  return db.from('users')
    .innerJoin('user_potlucks', 'user_potlucks.user_id', 'users.id')
    .innerJoin('potlucks', 'user_potlucks.potluck_id', 'potlucks.id')
    .select('users.firstName', 'users.lastName', 'potlucks.name', 'potlucks.location', 'potlucks.date', 'potlucks.time')
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
  findDetailsById,
  findById,
  add, 
  update, 
  remove
};