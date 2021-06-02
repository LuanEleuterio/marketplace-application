const api = require('../core/api')

const orderRepository = {
    create: async (token, body) => {
        const config = {
            authorization: token
        }
        return await api("POST", "/order", body, config)
    },

    cancel: async (token, body) => {
        const config = {
            authorization: token
        }
        return await api("PUT", "/order/cancel", body, config)
    },
    
    listByUser: async (token) => {
        const config = {
            authorization: token
        }
        return await api("GET", "/order/user", {}, config)
    },

    listByPartner: async (token) => {
        const config = {
            authorization: token
        }
        return await api("GET", "/order/partner", {}, config)
    }
}

module.exports = orderRepository