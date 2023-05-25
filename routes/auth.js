const express = require('express');
const router = express.Router()

const { login, register } = require('../controllers/auth')

router.post('/register', register)
router.post('/login', login)

// an alternative for the method above
// router.route('/register').post(register)
// router.route('/login').post(login)



module.exports = router
