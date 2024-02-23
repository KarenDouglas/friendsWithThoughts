const router = require('express').Router();

const {
    getUsers,
    createUser,
    updateUser,
    deleteUser, 
    addFriend,
    deleteFriend,
    getUserById

  } = require('../../controllers/userController');
  
  // /api/users
  router.route('/')
  .get(getUsers)
  .post(createUser)
  
  router.route('/:userId')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser)
 // /api/users/:userId/friends/:friendId

 router.route('/:userId/friends/:friendId')
 .post(addFriend)
 .delete(deleteFriend)

  
  module.exports = router;
  