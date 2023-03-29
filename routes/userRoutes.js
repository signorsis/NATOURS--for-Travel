const express = require('express');
const router = express.Router();
const usercontroller = require('./../controlers/usercontrollers');
router.route('/').get(usercontroller.getAllUsers).post(usercontroller.addUser);
router.route('/:id')
  .get(usercontroller.getUserById)
  .patch(usercontroller.updateUser)
  .delete(usercontroller.deleteUser);

module.exports = router;
