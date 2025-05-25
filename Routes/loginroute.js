const express = require('express');
const router = express.Router();
const logincontrol = require('../Controllers/login');


router.post('/login', logincontrol.login);
router.post('/refresh', logincontrol.refreshToken);

module.exports = router;