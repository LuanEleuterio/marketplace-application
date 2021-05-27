const userRepository = require('../repositories/user.repository')
const partnerRepository = require('../repositories/partner.repository')

const userController = {
    create: async (req, res, next) => {
        let user = await userRepository.register(req, res, next)
        return res.json(user)
    },
    update: async (req, res, next) => {
        let token = req.cookies['token']
        req.headers.authorization = `Bearer ${token}`

        let user = await userRepository.updateUser(req, res, next)

        return res.json(user)
    },
    renderRegister: async (req, res, next) => {
        res.render("user/registerUser")
    },
    renderProfile: async (req, res, next) => {
        let token = req.cookies['token']
        req.headers.authorization = `Bearer ${token}`
        let user = await userRepository.listUser(req, res, next)

        res.render("user/profile", {user: user.user})
    },
}

module.exports = userController;