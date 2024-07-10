const express = require('express')
const router = express.Router()
const controllers = require("../../controllers/client/product.controllers")
router.get("/",controllers.index)

module.exports = router