//Repositories
const gatewayRepository = require("../repositories/gateway.repository")
const repository = require("../repositories/product.repository")

const productController = {
    create: async (req, res, next) =>{       
        let product = await repository.create(req.headers.authorization, req.body)
        return res.json(product.data)
    },

    update:  async (req, res, next) => {
        let updatedProduct = await repository.update(req.headers.authorization, req.body)
        return res.json(updatedProduct.data)
    },

    delete:  async (req, res, next) => {
        let deletedProduct = await repository.delete(req.headers.authorization, req.params.productId)
        return res.json(deletedProduct.data)
    },

    calculateShipping: async (req, res, next) => {  
        const shipping = await respository.calculateShipping(req, res, next)
        res.json(shipping.data)
    },

    renderProduct: async (req, res, next) => {
        const product = await repository.list(req.params.productId)
        res.render("user/product", {product: product.data})
    },

    renderProducts: async (req, res, next) => {
        const products = await repository.listAll()
        res.render("pageProducts", {products: products.data})
    },

    renderFormProduct: async (req, res, next) => {
        return res.render("partner/product")
    },

    renderPartialProducts: async (req, res, next) =>{
        let token = `Bearer ${req.cookies['token']}`

        let products = await repository.listByPartner(token)
        return res.render("partials/products", {products: products.data})
    },

    renderProductEdit: async (req, res, next) =>{
        let product = await repository.list(req.params.productId)

        return res.render("partner/productEdit", {product: product.data})
    },

    renderCarrinho: async (req, res, next) => {
        let data = req.cookies['_carrinho-products-luaneletro']
        let carrinho = data != undefined ? JSON.parse(data) : undefined

        if( carrinho == undefined || carrinho?.products.length < 1){
            let message = {
                msg: "Não há itens no seu Carrinho",
                noItens: true
            }
            res.render("user/carrinho", {products: message})
        }else{
            req.body.products = carrinho.products
            let collectionProducts = await repository.listIn(req.body)
            collectionProducts.data.noItens = false
            res.render("user/carrinho", {products: collectionProducts.data})
        }
    }
}

module.exports = productController;
