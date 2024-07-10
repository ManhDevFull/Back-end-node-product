const Product = require('../../models/product.model')
module.exports.index = async (req, res) => {
    const products = await Product.find({
        deleted: false
    })

  const newProducts = products.map(item => {
    item.priceNew = (item.price*(100 - item.descountPercentage)/100).toFixed(0)
    return item
  })
    console.log(products)

    res.render("client/pages/products/index", {
        pageTitle: "Tất cả sản phẩm",
        products: newProducts
    })
}