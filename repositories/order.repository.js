const api = require('../core/api')

const orderRepository = {
    create: async (token, body) => {
        const config = {
            authorization: token
        }
        return await api("POST", "/orders", body, config)
    },

    cancel: async (token, body) => {
        const config = {
            authorization: token
        }
        return await api("PUT", "/orders/cancel", body, config)
    },
    
    listByUser: async (token) => {
        const config = {
            authorization: token
        }
        return await api("GET", "/orders/user", {}, config)
    },

    listByPartner: async (token) => {
        const config = {
            authorization: token
        }
        return await api("GET", "/orders/partner", {}, config)
    }
}

module.exports = orderRepository