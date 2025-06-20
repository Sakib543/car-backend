const express = require('express');
const router = express.Router();
const usercontrol = require('../Controllers/usercoontroller');
const Authentication = require('../Middleware/Auth');

//Routing

router.post('/register', usercontrol.createuser);
router.get('/verify-email', usercontrol.verifyemail);
router.get('/all', Authentication, usercontrol.getAllUsers);
router.delete('/delete-all', (req, res, next) => {
    console.log('DELETE ALL USERS ROUTE HIT');
    next();
}, usercontrol.deleteAllUsers);
router.get('/:id', usercontrol.getuserbyid);
router.put('/update/:Id', Authentication, usercontrol.updatuser);
router.delete('/:id', Authentication, usercontrol.userdelete);

module.exports = router;