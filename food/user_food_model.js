const db = require('../data/db-config');

const find = () => {
    return db('users_potluck_food');
};

const findBy = (user_id, food_id) => {
    return db('users_potluck_food').where({user_id, food_id}).first();
};

const add = (data) => {
    return db('users_potluck_food').insert(data)
        .then(ids => {
        console.log(ids); 
        return findBy(data.user_id, data.food_id);
        })
};


const remove = (user_id, food_id) => {
    return db('users_potluck_food').where({user_id, food_id}).del();
};

module.exports = {
    find, 
    findBy,
    add,
    update,
    remove
  };