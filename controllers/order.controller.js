const repository = require('../repositories/order.repository')
const userRepository = require('../repositories/user.repository')
const productRepository = require('../repositories/product.repository')
const viewHelper = require("../helpers/view.helper")

const orderController = {
    create: async (req, res, next) => {
        let token = `Bearer ${req.cookies['token']}`
        try{
            let order = await repository.create(token, req.body)        
            res.json(order.data)
        }catch(err){
            res.json(err)
        }
    },
    cancel: async (req, res, next) => {
        let token = req.headers.authorization

        let itemCanceled = await repository.cancel(token, req.body)
        return res.json(itemCanceled.data)
    },
    renderUser: async (req, res, next) => {
        let token = `Bearer ${req.cookies['token']}`
        let data = req.cookies['_luaneletro-logged']
        let logged = false

        data = data == undefined ? false : JSON.parse(data)

        if(data === true){
            logged = true
        }

        let orders = await repository.listByUser(token)
        res.render("user/orders", {
            layout: "layouts/user",
            orders: orders.data.orders, 
            logged,
            viewHelper
        })
    },
    renderPartner: async (req, res, next) => {
        let token = `Bearer ${req.cookies['token']}`
        let orders = await repository.listByPartner(token)
        res.render("partner/orders", {
            layout: 'layouts/partner',
            orders: orders.data.orders, 
            viewHelper})
    },
    renderCheckout: async (req, res, next) => {
        let token = await `Bearer ${req.cookies['token']}`
        let dataCarrinho = await req.cookies['_carrinho-finalize-order']
        let dataBuyNow = await req.cookies['_carrinho-buy-now']
        let userLogged = await req.cookies['_luaneletro-logged']
        let logged = false

        userLogged = userLogged == undefined ? false : JSON.parse(userLogged)

        if(userLogged === true){
            logged = true
        }
        
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
    }
}

module.exports = orderController;