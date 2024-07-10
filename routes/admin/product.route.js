const express = require('express')
const router = express.Router()
const multer = require('multer')
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')
const upload = multer()
const controllers = require("../../controllers/admin/product.controller")

cloudinary.config({
    cloud_name: 'dl3a0os7m',
    api_key: '729718785359536',
    api_secret: 'uyUDkzACrB_5FQYuYlblKQJ_Ce0'
})

router.get("/", controllers.product)
router.patch("/change-status/:status/:id", controllers.changeStatus)
router.patch("/change-multi", controllers.changeMulti)
router.get("/create", controllers.create)

router.post("/create",
    upload.single('thumbnail'),
    function (req, res, next) {
        if (req.file) {
            let streamUpload = (req) => {
                return new Promise((resolve, reject) => {
                    let stream = cloudinary.uploader.upload_stream(
                        (error, result) => {
                            if (result) {
                                resolve(result)
                            } else {
                                reject(error)
                            }
                        }
                    )
                    streamifier.createReadStream(req.file.buffer).pipe(stream)
                })
            }
            async function upload(req) {
                let result = await streamUpload(req)
                req.body[req.file.fieldname] = result.url
                next()
            }
            upload(req)
        } else {
            next()
        }
    }
    , controllers.createPost)
module.exports = router
