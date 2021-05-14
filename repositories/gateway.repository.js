const api = require('../core/api')

const gatewayRepository = {
    balance: async (req, res, next) => {
        const config = {
            authorization: req.headers.authorization
        }    
        try{
            let request = await api("GET", "/balance", {}, config) 
            return request.data
        } catch(err){
            return err
        }
    },
    listBanks: async (req, res, next) => {
        try{
            let request = await api("GET", "/banks")
            return request.data
        } catch(err){
            return err
        }
    },
    listBusiness: async (req, res, next) => {
        try{
            let request = await api("GET", "/business-areas")
            return request.data
        } catch(err){
            return err
        }
    },
    listBankAndBusiness: async (req, res, next) => {
        let bankAndBusiness = {}
        try{
            let requestBank = await api("GET", "/banks")
            let requestBusiness = await api("GET", "/business-areas")

            bankAndBusiness.banks = requestBank.data._embedded.banks
            bankAndBusiness.businessAreas = requestBusiness.data._embedded.businessAreas

            return bankAndBusiness
        } catch(err){
            return err
        }
    },
    listDocuments: async (req, res, next) => {
        const config = {
            authorization: req.headers.authorization
        }
        try{
            let request = await api("GET", "/documents", {}, config)              
            return request.data
        }catch(err){
            return err
        }
    },
    createOrder: async (req, res, next) => {
        const config = {
            authorization: req.headers.authorization
        }
        try{
            let request = await api("POST", "/charge", req.body, config)            
            return request.data
        }catch(err){
            return errW
        }
    },
    cancelOrder: async (req, res, next) => {
        const config = {
            authorization: req.headers.authorization
        }
        try{
            let request = await api("PUT", `/order/cancel/${req.params.orderId}`, {}, config)            
            return request.data
        }catch(err){
            return err
        }
    },
    sendPayment: async (req, res, next) => {
        const config = {
            authorization: req.headers.authorization
        }
        try{
            let request = await api("POST", "/payment", req.body, config)               
            return request.data
        }catch(err){
            return err
        }
    },
    createTokenCard: async (req, res, next) => {
        const config = {
            authorization: req.headers.authorization
        }
        try{
            let request = await api("POST", "/tokenization", req.body, config)            
            return request.data
        }catch(err){
            return err
        }
    }  
} 

module.exports = gatewayRepository
