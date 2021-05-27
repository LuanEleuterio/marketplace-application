const api = require('../core/api')

const userRepository = {
    register: async (req, res, next) => {
        let request = await api("POST", "/user", req.body)

        res.cookie('token', request.data.token, {
            maxAge: 86400 * 1000, // 24 hours
            httpOnly: true, // http only, prevents JavaScript cookie access
            secure: true // cookie must be sent over https / ssl
        });

        res.cookie('user-id', request.data._id, {
            maxAge: 86400 * 1000, // 24 hours
            httpOnly: true, // http only, prevents JavaScript cookie access
            secure: true // cookie must be sent over https / ssl
        });

        return request.data
    },
    updateUser: async (req, res, next) => {
        const config = {
            authorization: req.headers.authorization
        }

        let request = await api("PUT", "/user", req.body, config)

        return request.data
    },
    listUser: async (req, res, next) => {
        const config = {
            authorization: req.headers.authorization
        }
        let request = await api("GET", "/user", {}, config)
    
        return request.data
    },
    listOrder: async (req, res, next) => {
        const config = {
            authorization: req.headers.authorization
        }
        let request = await api("GET", "/user/orders", {}, config)
    
        return request.data
    },
    listCards: async (req, res, next) => {
        const config = {
            authorization: req.headers.authorization
        }
        let request = await api("GET", "/user/cards", {}, config)
     
        return request.data
    },
    cancelCard: async (req, res, next) => {
        const config = {
            authorization: req.headers.authorization
        }

        let request = await api("PUT", `/user/card/cancel/${req.params.cardId}`, {}, config)

        return request.data
    }
}

module.exports = userRepository