
exports.seed = function(knex) {
  
  return knex('users').insert([
    {username: 'harry', password: 'harry', firstName: 'Harry', lastName: 'Potter' },
    {username: 'ron', password: 'ron', firstName: 'Ron', lastName: 'Weasley' },
    {username: 'ginny', password: 'ginny', firstName: 'Ginny', lastName: 'Weasley' }
  ]);

};
