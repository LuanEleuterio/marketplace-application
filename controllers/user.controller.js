const userRepository = require('../repositories/user.repository')
const partnerRepository = require('../repositories/partner.repository')

const userController = {
    register: async (req, res, next) => {
        let user = await userRepository.register(req, res, next)
        return user
    },
    cancelCard: async (req, res, next) => {
        let cardCancel = await userRepository.cancelCard(req, res, next)
        res.json(cardCancel)
    },
    renderRegister: async (req, res, next) => {
        res.render("user/registerUser")
    },
    renderProducts: async (req, res, next) => {
        req.calledFrom = 'USER'
        const products = await partnerRepository.listProducts(req, res, next)

        res.render("pageProducts", {products: products})
    },
    renderOrders: async (req, res, next) => {
        let token = req.cookies['token']
        req.headers.authorization = `Bearer ${token}`
        let orders = await userRepository.listOrder(req, res, next)

        res.render("user/orders", {orders: orders})
    },
    renderCards: async (req, res, next) => {
        let token = req.cookies['token']
        req.headers.authorization = `Bearer ${token}`
        let cards = await userRepository.listCards(req, res, next)

        res.render("user/cards", {cards: cards})
    },
    renderProfile: async (req, res, next) => {
        let token = req.cookies['token']
        req.headers.authorization = `Bearer ${token}`
        let user = await userRepository.listUser(req, res, next)

        res.render("user/profile", {user: user.user})
    }
}

module.exports = userController;
