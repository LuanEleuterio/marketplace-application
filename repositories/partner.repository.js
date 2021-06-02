const api = require('../core/api')

const partnerRepository = {
    register: async (body) => {
        return await api("POST", "/partner", body)
    },
    update: async (token, body) => {
        const config = {
            authorization: token
        }
        return await api("PUT", "/partner", body, config)
    },
    list: async (token) => {
        const config = {
            authorization: token
        }

        return await api("GET", "/partner", {}, config)
    }
}

module.exports = partnerRepository