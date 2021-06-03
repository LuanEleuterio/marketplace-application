const api = require('../core/api')

const cardRepository = {
    create: async (token, body) => {
        const config = {
            authorization: token
        }
        return await api("POST", "/cards", body, config)
    },
    listAll: async (token) => {
        const config = {
            authorization: token
        }
        return await api("GET", "/cards", {}, config)
    },
    delete: async (token, cardId) => {
        const config = {
            authorization: token
        }

        return await api("DELETE", `/cards/${cardId}`, {}, config)
    }
}

module.exports = cardRepository