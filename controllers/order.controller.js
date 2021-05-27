const repository = require('../repositories/order.repository')
const userRepository = require('../repositories/user.repository')
const productRepository = require('../repositories/product.repository')
const cardsRepository = require('../repositories/card.repository')

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
    renderUser: async (req, res, next) => {
        let token = `Bearer ${req.cookies['token']}`

        let orders = await repository.listByUser(token)
        res.render("user/orders", {orders: orders.data})
    },
    renderPartner: async (req, res, next) => {
        let token = `Bearer ${req.cookies['token']}`
        let orders = await repository.listByPartner(token)
        res.render("partner/orders", {orders: orders.data})
    },
    renderCheckout: async (req, res, next) => {
        let token = await `Bearer ${req.cookies['token']}`
        let data = await req.cookies['_carrinho-finalize-order']
        let carrinhoOrder = JSON.parse(data)

        req.body.products = carrinhoOrder.products
        req.headers.authorization = token

        let user = await userRepository.listUser(req, res, next)
        let cards = await cardsRepository.listAll(token)
        let collectionProducts = await productRepository.listIn(req.body)

        let products = collectionProducts.data.map((product) =>{
            for( let order of carrinhoOrder.products){
                if(product._id === order.productId){
                    product.qtd = order.qtd
                }
            }
            return product
        })

        let totalFrete = 0 

        for(let product of products) {
            product.shipping = await productRepository.calculateShipping(product._id, product.qtd, user.user.address.postCode)
            
            let shipValue = product.shipping.cResultado.Servicos.cServico.Valor._text.replace(",",".")
            totalFrete += parseFloat(shipValue)
        }

        let totalOrder = (parseFloat(carrinhoOrder.subtotal) + totalFrete).toFixed(2)
        
        res.render("user/finalizeOrder",{
            user: user.user,
            subtotal: carrinhoOrder.subtotal,
            products,
            cards: cards.data,
            totalOrder,
            totalFrete,
        })
    },
    cancel: async (req, res, next) => {
        let token = `Bearer ${req.cookies['token']}`

        let orderCancel = await repository.cancel(token, orderId)
        return res.json(orderCancel)
    }
}

module.exports = orderController;