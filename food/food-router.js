const router = require('express').Router();

const Food = require('./food-model');
//const UserFood = require('./user_foods_model');

router.get('/', (req, res) => {
  Food.find()
    // .then(foods => {
    //   console.log(foods);
    //   res.status(200).send(foods);
    // })  
    .then(foods => {
        console.log(foods);
        res.status(200).send({message: 'Get food'});
      }) 
    .catch(error => {
      console.log(error);
      console.log({message: 'There was an error in getting data from the database.'});
    })
});

module.exports = router;