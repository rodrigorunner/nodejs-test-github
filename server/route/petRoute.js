const express = require('express')
const router = express.Router()
const controller = require('../controller/petController')

router.route('/:id')
.post(controller.createPet)
.get(controller.getPet)
.put(controller.updatePet)
.delete(controller.deletePet)

module.exports = router