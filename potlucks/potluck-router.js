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

router.put('/:id/potluck/:potluck_id', validateUser, (req, res) => {
  const user_id = req.params.id;
  const potluck_id = req.params.potluck_id;
  const changes = req.body;

  Potluck.update(changes, potluck_id)
    .then(potluck => {
      console.log(potluck);
      res.status(200).send(potluck);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send({message: 'The potluck could not be updated'});
    })
});

router.delete('/:id/potluck/:potluck_id', validateUser, (req, res) => {
  const user_id = req.params.id;
  const potluck_id = req.params.potluck_id;

  Potluck.remove(potluck_id)
    .then(count => {
      console.log(count);
      res.status(200).send({message: 'The potluck was deleted.'});
    })
    .catch(error => {
      console.log(error);
      res.status(500).send({message: 'The potluck could not be deleted'});
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

function validateUser(req, res, next) {
  const user_id = Number(req.params.id);
  console.log('the user id is ', user_id);
  console.log(typeof user_id);
  const potluck_id = req.params.potluck_id;

  Potluck.findById(potluck_id)
    .first()
    .then(potluck => {
      console.log(potluck);
      console.log(typeof potluck.id);
      if(potluck.user_id === user_id) {
        next();
      } else {
        res.status(403).send({message: 'You are not authorized to update/delete the potluck.'});
      }
    })  
    .catch(error => {
      console.log(error);
      res.status(500).send({message: 'There was an error. Please try again later.'});
    })
};

module.exports = router;