const repository = require('../repositories/order.repository')
const userRepository = require('../repositories/user.repository')
const productRepository = require('../repositories/product.repository')
const viewHelper = require("../helpers/view.helper")

const orderController = {
    create: async (req, res, next) => {
        try{
            let token = `Bearer ${req.cookies['token']}`
            let order = await repository.create(token, req.body)   

            if(order.error){
                throw new Error(order.response.data)
            }

            res.status(200).json(order.data)
        }catch(err){
            res.status(400).json(err)
        }
    },
    cancel: async (req, res, next) => {
        try{
            let token = req.headers.authorization
            let itemCanceled = await repository.cancel(token, req.body)

            if(itemCanceled.error){
                throw new Error(itemCanceled.response.data)
            }

            return res.status(200).json(itemCanceled.data)
        }catch(err){
            return res.status(400).json(err)
        }

    },
    renderUser: async (req, res, next) => {
        let token = `Bearer ${req.cookies['token']}`
        let data = req.cookies['_luaneletro-logged']
        let typeUser = req.cookies['_luaneletro-user-type']
        let logged = false

        logged = data == undefined ? false : JSON.parse(data)
        typeUser = typeUser == undefined ? "" : typeUser

        if(logged && typeUser === "USER" ){
            let orders = await repository.listByUser(token)
            res.render("user/orders", {
                layout: "layouts/user",
                orders: orders.data.orders, 
                logged,
                viewHelper
            })
        }else{
            res.redirect('/');
        }
    },
    renderPartner: async (req, res, next) => {
        let token = `Bearer ${req.cookies['token']}`
        let data = req.cookies['_luaneletro-logged']
        let typeUser = req.cookies['_luaneletro-user-type']
        let logged = false

        logged = data == undefined ? false : JSON.parse(data)
        typeUser = typeUser == undefined ? "" : typeUser

        if(logged && typeUser === "PARTNER" ){            
            let orders = await repository.listByPartner(token)
            res.render("partner/orders", {
                layout: 'layouts/partner',
                orders: orders.data.orders, 
                viewHelper
            })
        }else{
            res.redirect('/');
        }
    },
    renderCheckout: async (req, res, next) => {
        let token = await `Bearer ${req.cookies['token']}`
        let dataCarrinho = await req.cookies['_carrinho-finalize-order']
        let dataBuyNow = await req.cookies['_carrinho-buy-now']
        let data = await req.cookies['_luaneletro-logged']
        let typeUser = req.cookies['_luaneletro-user-type']
        let logged = false

        logged = data == undefined ? false : JSON.parse(data)
        typeUser = typeUser == undefined ? "" : typeUser

        if(logged && typeUser === "USER" ){            
            let carrinhoOrder

            if(dataBuyNow != undefined) {
                carrinhoOrder = JSON.parse(dataBuyNow)
            }else{
                carrinhoOrder = JSON.parse(dataCarrinho)
            }
            
            req.body.products = carrinhoOrder.products
    
            let user = await userRepository.list(token)
            let collectionProducts = await productRepository.listIn(req.body)
    
            let products = collectionProducts.data.products.map((product) =>{
                for( let order of carrinhoOrder.products){
                    if(product._id === order.productId){
                        product.qtd = order.qtd
                    }
                }
                return product
            })
    
            let totalFrete = 0 
    
            for(let product of products) {
                product.shipping = await productRepository.calculateShipping(product._id, product.qtd, user.data.user.address.postCode)
                let shipValue = product.shipping.shippingValue.cResultado.Servicos.cServico.Valor._text.replace(",",".")
                totalFrete += parseFloat(shipValue)
            }
    
            let totalOrder = (parseFloat(carrinhoOrder.subtotal) + totalFrete).toFixed(2)
            
            res.render("user/finalizeOrder",{
                layout: "layouts/user",
                user: user.data.user,
                subtotal: carrinhoOrder.subtotal,
                products,
                cards: user.data.user.cards,
                totalOrder,
                totalFrete,
                logged,
                viewHelper
            })
        }else{
            res.redirect('/');
        }
        
       
    }
}

module.exports = orderController;