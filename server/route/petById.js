const express = require('express')
const router = express.Router()
const controller = require('../controller/petById')

router.route('/:id')
.get(controller.getPetById)

module.exports = router