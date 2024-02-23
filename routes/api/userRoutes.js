const router = require('express').Router();

const {
    getUsers,
    createUser,
    updateUser,
    deleteUser 

  } = require('../../controllers/userController');
  
  // /api/users
  router.route('/')
  .get(getUsers)
  .post(createUser)
  
  router.route('/:userId')
  .put(updateUser)
  .delete(deleteUser)
  // /api/users/:userId

  
  module.exports = router;
  