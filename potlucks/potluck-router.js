const router = require('express').Router();

const Potluck = require('./potluck-model');

router.post('/:id/potluck', validatePotluckData, (req, res) => {
  const potluckData = req.body;
  const user_id = req.params.id;


  Potluck.add({...potluckData, user_id})
    .then(potluck => {
      console.log(potluck);
      res.status(201).send(potluck);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send({message: 'The potluck could not be created.'});
    })

});


function validatePotluckData(req, res, next) {
  const potluckData = req.body;

  if(!potluckData.name || !potluckData.location || !potluckData.time || !potluckData.date) {
    res.status(400).send({message: 'Potluck name, location, date and time are required.'});
  } else {
    next();
  }
}

module.exports = router;