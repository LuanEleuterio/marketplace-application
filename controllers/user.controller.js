const userRepository = require('../repositories/user.repository')
const partnerRepository = require('../repositories/partner.repository')

const userController = {
    create: async (req, res, next) => {
        let user = await userRepository.register(req.body)

        res.cookie('token', user.data.token, {
            maxAge: 86400 * 1000,
        });

        res.cookie('user-id', user.data._id, {
            maxAge: 86400 * 1000
        });

        return res.json(user.data)
    },
    update: async (req, res, next) => {
        let token = `Bearer ${req.cookies['token']}`

        let user = await userRepository.update(token, req.body)

        return res.json(user.data)
    },
    renderRegister: async (req, res, next) => {
        res.render("user/registerUser",{
            layout: "layouts/default"
        })
    },
    renderProfile: async (req, res, next) => {
        let token = `Bearer ${req.cookies['token']}`
        let data = req.cookies['_luaneletro-logged']
        let logged = false

        data = data == undefined ? false : JSON.parse(data)

        if(data === true){
            logged = true
        }

        let user = await userRepository.list(token)

        res.render("user/profile", {
            layout: "layouts/user",
            user: user.data.user, 
            logged
        })
    },
}

module.exports = userController;