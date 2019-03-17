const router = require('express').Router()
const userController = require('../controllers/userController')

router.get('/', userController.findAll)
router.post('/signin', userController.signIn)
router.post('/signup', userController.signUp)
router.post('/google', userController.signInGoogle)

module.exports = router