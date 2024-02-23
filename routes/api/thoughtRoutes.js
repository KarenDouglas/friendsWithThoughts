const router = require('express').Router();

const {
    getThoughts,
    getThoughtByID,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction

  } = require('../../controllers/thoughtController');

  router.route('/')
  .get(getThoughts)

  router.route('/:thoughtId')
  .get(getThoughtByID)
  .put(updateThought)
  .delete(deleteThought)

  router.route('/:userId')
  .post(createThought)

  router.route('/:thoughtId/reactions')
  .post(createReaction)

  router.route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction)



  module.exports = router;
  