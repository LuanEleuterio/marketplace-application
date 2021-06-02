//Repositories
const repository = require("../repositories/product.repository")

//Helpers
const viewHelper = require("../helpers/view.helper")

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
        const shipping = await repository.calculateShipping(req.query.productId, req.query.productQtd, req.query.cepDestino)
        res.json(shipping)
    },

    renderProduct: async (req, res, next) => {
        let data = req.cookies['_luaneletro-logged']
        let logged = false

        data = data == undefined ? false : JSON.parse(data)

        if(data === true){
            logged = true
        }

        const product = await repository.list(req.params.productId)
        res.render("user/product", {
            layout:'layouts/user',
            product: product.data.product, 
            logged, 
            viewHelper
        })
    },

    renderProducts: async (req, res, next) => {
        let data = req.cookies['_luaneletro-logged']
        let logged = false

        data = data == undefined ? false : JSON.parse(data)

        if(data === true){
            logged = true
        }

        const products = await repository.listAll()
        res.render("pageProducts", {
            layout:'layouts/user', 
            products: products.data.products, 
            logged, 
            viewHelper})
    },

    renderCarrinho: async (req, res, next) => {
        let carrinho = req.cookies['_carrinho-products-luaneletro']
        let userLogged = req.cookies['_luaneletro-logged']
        let logged = false

        carrinho = carrinho != undefined ? JSON.parse(carrinho) : undefined
        userLogged = userLogged == undefined ? false : JSON.parse(userLogged)

        if(userLogged === true){
            logged = true
        }

        if( carrinho == undefined || carrinho?.products.length < 1){
            let message = {
                msg: "Não há itens no seu Carrinho",
                noItens: true
            }
            res.render("user/carrinho", {
                layout:'layouts/user', 
                products: message, 
                logged})
        }else{
            req.body.products = carrinho.products
            let collectionProducts = await repository.listIn(req.body)
            collectionProducts.data.noItens = false
            res.render("user/carrinho", {
                layout:'layouts/user', 
                products: collectionProducts.data.products, 
                logged,
                viewHelper})
        }
    },

    renderPartialProducts: async (req, res, next) =>{
        let token = `Bearer ${req.cookies['token']}`
        console.log(token)
        let products = await repository.listByPartner(token)
        return res.render("partials/products", {
            layout:'layouts/none', 
            products: products.data.products, 
            viewHelper})
    },

    renderFormProduct: async (req, res, next) => {
        return res.render("partner/product",{
            layout: 'layouts/partner',
        })
    },

    renderProductRegister: async (req, res, next) =>{
        return res.render("partner/productRegister",{
            layout: 'layouts/partner',
        })
    },

    renderProductEdit: async (req, res, next) =>{
        let product = await repository.list(req.params.productId)

        return res.render("partner/productEdit", {
            layout: 'layouts/partner',
            product: product.data.product,
            viewHelper
        })
    },
}

module.exports = productController;
