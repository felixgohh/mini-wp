const router = require('express').Router()
const articleController = require('../controllers/articleController')
const images = require('../helpers/images')
const authorized = require('../middlewares/authorized')

router.get('/', articleController.findAll)
router.post('/', images.multer.single('image'), images.sendUploadToGCS, articleController.create)
router.get('/:id', articleController.findById)
router.put('/:id', authorized, images.multer.single('image'), images.sendUploadToGCS, articleController.update)
router.delete('/:id', authorized, articleController.delete)

module.exports = router