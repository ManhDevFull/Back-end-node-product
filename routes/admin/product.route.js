const express = require('express')
const router = express.Router()
const multer = require('multer')
const multerHelper = require('../../helpers/storageMulter')
const upload = multer({ storage: multerHelper()})
const controllers = require("../../controllers/admin/product.controller")



router.get("/",controllers.product)
router.patch("/change-status/:status/:id",controllers.changeStatus)
router.patch("/change-multi",controllers.changeMulti)
router.get("/create",controllers.create)
router.post("/create", upload.single('thumbnail'),controllers.createPost)
module.exports = router
