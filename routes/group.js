const exp = require('constants');
const express = require('express');
const userAuthentication = require('../middelware/auth');
const groupControllers = require('../controllers/group');

const router = express.Router();

router.post('/create-group', userAuthentication.authenticate, groupControllers.createGroup);

router.get('/get-groups', userAuthentication.authenticate, groupControllers.getGroups);

router.get('/get-user/:groupid', userAuthentication.authenticate, groupControllers.getUsers);

router.post('/add-user/:userid/:groupid', groupControllers.addUsers);

router.get('/get-remove-users/:groupid', userAuthentication.authenticate, groupControllers.getUsersRmove);

router.delete('/remove-user/:userid/:groupid', userAuthentication.authenticate, groupControllers.removeUser);




module.exports = router;