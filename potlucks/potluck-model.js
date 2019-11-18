const db = require('../data/db-config');

const find = () => {
  
};

const findById = (id) => {
  return db('potlucks').where({id});
};

const add = (potluckData) => {
  return db('potlucks').insert(potluckData)
    .then(ids => {
      console.log(ids);
      return findById(ids[0]);
    })
};

module.exports = {
  find,
  findById,
  add
};