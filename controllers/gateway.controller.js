const api = require("../core/api");

const gatewayController = {
    getBalance: async (req, res, next) => {
        const config = {
            authorization: req.headers.authorization
        }    
        try{
            let request = await api("GET", "/balance", {}, config) 
            return res.send(request.data)
        } catch(err){
            return res.send(err)
        }
    },
    getBanks: async (req, res, next) => {
        try{
            let request = await api("GET", "/banks")
            return res.send(request.data)
        } catch(err){
            return res.send(err)
        }
    },
    getBusiness: async (req, res, next) => {
        try{
            let request = await api("GET", "/business-areas")
            return res.send(request.data)
        } catch(err){
            return res.status(400).send(err)
        }
    },
    getBankAndBusiness: async () => {
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
    getDocuments: async (req, res, next) => {
        const config = {
            authorization: req.headers.authorization
        }
        try{
            let request = await api("GET", "/documents", {}, config)              
            res.send(request.data)
        }catch(err){
            res.send(err)
        }
    },
    createCharge: async (req, res, next) => {
        const config = {
            authorization: req.headers.authorization
        }
        try{
            let request = await api("POST", "/charge", req.body, config)            
            res.send(request.data)
        }catch(err){
            res.send(err)
        }
    },
    sendPayment: async (req, res, next) => {
        const config = {
            authorization: req.headers.authorization
        }
        try{
            let request = await api("POST", "/payment", req.body, config)               
            res.send(request.data)
        }catch(err){
            res.send(err)
        }
    },
    createTokenCard: async (req, res, next) => {
        const config = {
            authorization: req.headers.authorization
        }
        try{
            let request = await api("POST", "/tokenization", req.body, config)            
            res.send(request.data)
        }catch(err){
            res.send(err)
        }
    }
}

module.exports = gatewayController;
