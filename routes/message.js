const exp = require('constants');
const express = require('express');
const messageControllers = require('../controllers/message');
const userAuthentication = require('../middelware/auth');


const router = express.Router();

router.post('/send-msg', userAuthentication.authenticate, messageControllers.sendMessage);

router.get('/get-message/:groupid', messageControllers.getMessage);






module.exports = router;