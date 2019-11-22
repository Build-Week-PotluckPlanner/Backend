const router = require('express').Router();

const Food = require('./food-model');
//const UserFood = require('./user_foods_model');
const db = require('../data/db-config');

// GET all foods
router.get('/', (req, res) => {
  Food.find()
    .then(foods => {
      console.log(foods);
      res.status(200).send(foods);
    }) 
    .catch(error => {
      console.log(error);
      console.log({message: 'There was an error in getting data from the database.'});
    })
});

// GET food by id
router.get('/:id', (req, res) => {
    const user_id = req.user.id;
    const food_id = req.params.id;
  
    Food.findById(food_id)
        .then(food => {
            console.log(food);
            res.status(200).send(food);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({message: 'DB error. Try again.'})
        })
  });

// ADD a new food item
router.post('/', validateFoodData, (req, res) => {
    let foodData = req.body;

    Food.add(foodData)
        .then(food => {
            console.log(food);
            res.status(201).send(food);
        })
          .catch(error => {
            res.status(503).json({ message: error });
            console.log(error);
          });
})

// router.get('/user/:id', (req, res) => {

//     console.log(req.user.id);
  
//     User.findAllExpectId(req.user.id)
//       .then(userFood => {
//         res.status(200).send(userFood);
//       })
//       .catch(error => {
//         console.log(error);
//         res.status(500).send({message: 'There was a DB error.'});
//       })
//   });

  // ADD a new food item for user
// router.post('/user:id', (req, res) => {
//     let usersFood = req.body;

//     Food.add(usersFood)
//         .then(foods => {
//             console.log(foods);
//             res.status(201).send(foods);
//         })
//           .catch(error => {
//             res.status(503).json({ message: error });
//             console.log(error);
//           });
// })

function validateFoodData(req, res, next) {
    const foodData = req.body;

    if(!foodData.name) {
        res.status(400).send({message: 'Food name is required.'});
    } else {
        next();
    }
}

module.exports = router;