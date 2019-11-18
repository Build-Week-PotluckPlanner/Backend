const db = require('../data/db-config');

const find = () => {
  return db('potlucks');
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

module.exports = {
  find,
  findById,
  add, 
  update, 
  remove
};