const api = require('../core/api')

const userRepository = {
    register: async (body) => {
        return await api("POST", "/user", body)
    },
    update: async (token, body) => {
        const config = {
            authorization: token
        }
        return await api("PUT", "/user", body, config)
    },
    list: async (token) => {
        const config = {
            authorization: token
        }
        return await api("GET", "/user", {}, config)
    }
}

module.exports = userRepository