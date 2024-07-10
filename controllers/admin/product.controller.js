const Product = require('../../models/product.model')
const filterStatusHelper = require("../../helpers/filterStatus")
const searchHelper = require("../../helpers/search")
const systemConfig = require('../../config/system')
module.exports.product = async (req, res) => {

    const finderStatus = filterStatusHelper(req.query)
    let find = {
        deleted: false
    }
    if (req.query.status) {
        find.status = req.query.status
    }
    const objectSearch = searchHelper(req.query)
    if (objectSearch.keySearch) {
        find.title = objectSearch.regex
    }
    const objectPage = {
        limit: 4,
        current: 1,
    }
    if (req.query.page) {
        objectPage.current = parseInt(req.query.page)
    }
    objectPage.skip = (objectPage.current - 1) * objectPage.limit

    const countProduct = await Product.countDocuments(find)
    objectPage.totalPage = Math.ceil(countProduct / objectPage.limit)

    const products = await Product.find(find).limit(objectPage.limit).skip(objectPage.skip)
    res.render("admin/pages/products/index", {
        pageTitle: "Trang sản phẩm",
        products: products,
        finderStatus: finderStatus,
        keySearch: objectSearch.keySearch,
        objectPage: objectPage
    })
}
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status
    const id = req.params.id
    await Product.updateOne({ _id: id }, { status: status })
    res.redirect('back')
}
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type
    const ids = req.body.ids.split(", ")
    switch (type) {
        case "active":
            await Product.updateMany({ _id: { $in: ids } }, { status: "active" })
            break;
        case "inactive":
            await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" })
            break;
        default:
            break;
    }
    res.redirect('back')
}
module.exports.create = (req, res) => {
    res.render("admin/pages/products/create", {
        pageTitle: "Create Product"
    })
}
module.exports.createPost = async (req, res) => {
    req.body.price = parseInt(req.body.price)
    req.body.descountPercentage = parseInt(req.body.descountPercentage)
    req.body.stock = parseInt(req.body.stock)
    const a = await Product.countDocuments()
    req.body.position = a + 1
    const product = new Product(req.body)
    await product.save()
    res.redirect(`${systemConfig.prefixAdmin}/products`)
}
