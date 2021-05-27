const api = require('../core/api')

const gatewayRepository = {
    balance: async (req, res, next) => {
        const config = {
            authorization: req.headers.authorization
        }    
        let request = await api("GET", `/balance`, {}, config) 
        return request.data
    },
    listBanks: async (req, res, next) => {
        let request = await api("GET", "/banks")
        return request.data
    },
    listBusiness: async (req, res, next) => {
        let request = await api("GET", "/business-areas")
        return request.data
    },
    listBankAndBusiness: async (req, res, next) => {
        let bankAndBusiness = {}

        let requestBank = await api("GET", "/banks")
        let requestBusiness = await api("GET", "/business-areas")

        bankAndBusiness.banks = requestBank.data._embedded.banks
        bankAndBusiness.businessAreas = requestBusiness.data._embedded.businessAreas

        return bankAndBusiness
    },
    listDocuments: async (req, res, next) => {
        const config = {
            authorization: req.headers.authorization
        }
        let request = await api("GET", "/documents", {}, config)              
        return request.data
    },
    createCharge: async (req, res, next) => {
        const config = {
            authorization: req.headers.authorization
        }
        let request = await api("POST", "/charge", req.body, config)            
        return request.data
    },
    cancelCharge: async (req, res, next) => {
        const config = {
            authorization: req.headers.authorization
        }
        let request = await api("PUT", `/charge/cancel/${req.params.orderId}`, {}, config)            
        return request.data
    },
    sendPayment: async (req, res, next) => {
        const config = {
            authorization: req.headers.authorization
        }
        let request = await api("POST", "/payment", req.body, config)               
        return request.data
    },
    createTokenCard: async (req, res, next) => {
        const config = {
            authorization: req.headers.authorization
        }
        let request = await api("POST", "/tokenization", req.body, config)            
        return request.data
    },
    createDigitalAccount: async (req, res, next) =>{ 
        const config = {
            authorization: req.headers.authorization
        }
        let request = await api("POST", "/digital-account", req.body, config)            
        return request.data
    }
} 

module.exports = gatewayRepository
