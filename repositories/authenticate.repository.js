const api = require('../core/api')

const authenticateRepository = {
    auth: async (body) => {
        return await api("POST", "/auth", body)
    }
}

module.exports = authenticateRepository