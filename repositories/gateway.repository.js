const api = require('../core/api')

const gatewayRepository = {
    balance: async (token) => {
        const config = {
            authorization: token
        }    
        return await api("GET", `/balance`, {}, config)
    },
    listBanks: async () => {
        return await api("GET", "/banks")
    },
    listBusiness: async () => {
        return await api("GET", "/business-areas")
    },
    listDocuments: async (token) => {
        const config = {
            authorization: token
        }
        let request = await api("GET", "/documents", {}, config)              
        return request.data
    },
    createDigitalAccount: async (token, body) =>{ 
        const config = {
            authorization: token
        }
        return await api("POST", "/digital-account", body, config)
    }
} 

module.exports = gatewayRepository
