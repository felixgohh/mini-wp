const router = require('express').Router()
const articleController = require('../controllers/articleController') 

router.get('/', articleController.findAll)
router.post('/', articleController.create)
router.get('/:id', articleController.findById)
router.put('/:id', articleController.update)
router.delete('/:id', articleController.delete)

module.exports = router