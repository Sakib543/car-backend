const express = require('express');
const router = express.Router();
const usercontrol = require('../Controllers/usercoontroller');
const Authentication = require('../Middleware/Auth');

//Routing

router.post('/register', usercontrol.createuser);
router.get('/verify-email', usercontrol.verifyemail);
router.get('/all', Authentication, usercontrol.getAllUsers);
router.get('/:id', usercontrol.getuserbyid);
router.put('/update/:Id', Authentication, usercontrol.updatuser);
router.delete('/:id', Authentication, usercontrol.userdelete);
router.delete('/delete-all', usercontrol.deleteAllUsers);

module.exports = router;