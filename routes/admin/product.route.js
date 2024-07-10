const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer()
const controllers = require("../../controllers/admin/product.controller")
const uploadCloud = require('../../middlewares/admin/uploadCloud.middleware')



router.get("/", controllers.product)
router.patch("/change-status/:status/:id", controllers.changeStatus)
router.patch("/change-multi", controllers.changeMulti)
router.get("/create", controllers.create)

router.post("/create",
    upload.single('thumbnail'), uploadCloud.upload, controllers.createPost)
module.exports = router
