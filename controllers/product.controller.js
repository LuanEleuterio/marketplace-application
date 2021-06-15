//Repositories
const repository = require("../repositories/product.repository")

//Helpers
const viewHelper = require("../helpers/view.helper")

const productController = {
    create: async (req, res, next) =>{       
        try{
            let product = await repository.create(req.headers.authorization, req.body)

            if(product?.response?.data?.error){
                throw new Error(product.response.data)
            }

            res.status(200).json(product.data)
        }catch(err){
            res.status(400).json(err)
        }
    },

    update:  async (req, res, next) => {
        try{
            let updatedProduct = await repository.update(req.headers.authorization, req.body)
            
            if(updatedProduct?.response?.data?.error){
                throw new Error(updatedProduct.response.data)
            }
            
            return res.status(200).json(updatedProduct.data)
        }catch(err){
            return res.status(400).json(err)
        }
    },

    delete:  async (req, res, next) => {
        try {
            let deletedProduct = await repository.delete(req.headers.authorization, req.params.productId)
           
            if(deletedProduct?.response?.data?.error){
                throw new Error(deletedProduct.response.data)
            }
           
            return res.json(deletedProduct.data)
        } catch (err) {
            return res.status(400).json(err)
        }

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

        let products = await repository.listByPartner(token)
        return res.render("partials/products", {
            layout:'layouts/none', 
            products: products.data.products, 
            viewHelper})
    },

    renderFormProduct: async (req, res, next) => {
        let data = req.cookies['_luaneletro-logged']
        let typeUser = req.cookies['_luaneletro-user-type']
        let logged = false

        logged = data == undefined ? false : JSON.parse(data)
        typeUser = typeUser == undefined ? "" : typeUser

        if(logged && typeUser === "PARTNER" ){         
            return res.render("partner/product",{
                layout: 'layouts/partner',
            })
        }else{
            res.redirect('/');
        }

    },

    renderProductRegister: async (req, res, next) =>{
        let data = req.cookies['_luaneletro-logged']
        let typeUser = req.cookies['_luaneletro-user-type']
        let logged = false

        logged = data == undefined ? false : JSON.parse(data)
        typeUser = typeUser == undefined ? false : typeUser

        if(logged && typeUser === "PARTNER" ){         
            return res.render("partner/productRegister",{
                layout: 'layouts/partner',
            })
        }else{
            res.redirect('/');
        }
    },

    renderProductEdit: async (req, res, next) =>{
        let data = req.cookies['_luaneletro-logged']
        let typeUser = req.cookies['_luaneletro-user-type']
        let logged = false

        logged = data == undefined ? false : JSON.parse(data)
        typeUser = typeUser == undefined ? "" : typeUser

        if(logged && typeUser === "PARTNER" ){         

            let product = await repository.list(req.params.productId)

            return res.render("partner/productEdit", {
                layout: 'layouts/partner',
                product: product.data.product,
                viewHelper
            })
        }else{
            res.redirect('/');
        }
    },
}

module.exports = productController;
