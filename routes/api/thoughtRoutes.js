const router = require('express').Router();

const {
    getThoughts,
    getThoughtByID,
    createThought,
    updateThought,
    deleteThought

  } = require('../../controllers/thoughtController');

  router.route('/')
  .get(getThoughts)

  router.route('/:thoughtId')
  .get(getThoughtByID)
  .put(updateThought)
  .delete(deleteThought)

  router.route('/:userId')
  .post(createThought)



  module.exports = router;
  