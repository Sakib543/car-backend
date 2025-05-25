const express = require('express');
const router = express.Router();
const ChangeEP = require('../Controllers/ChangeEmailPassword');
const Authentication = require('../Middleware/Auth');

//Routes

router.put('/update/:Id', Authentication, ChangeEP.updateemailpassword);

module.exports = router;