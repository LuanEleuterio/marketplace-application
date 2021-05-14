const gatewayRepository = require('../repositories/gateway.repository')

const gatewayController = {
    getBalance: async (req, res, next) => {
        try{
            let balance = await gatewayRepository.balance(req, res, next) 
            return res.send(balance)
        } catch(err){
            return res.send(err)
        }
    },
    getBanks: async (req, res, next) => {
        try{
            let banks = await gatewayRepository.listBanks(req, res, next)
            return res.send(banks)
        } catch(err){
            return res.send(err)
        }
    },
    getBusiness: async (req, res, next) => {
        try{
            let business = await gatewayRepository.listBusiness(req, res, next)
            return res.send(business)
        } catch(err){
            return res.status(400).send(err)
        }
    },
    getBankAndBusiness: async (req, res, next) => {
        try{
            const bankAndBusiness = await gatewayRepository.listBankAndBusiness()
            return res.send(bankAndBusiness)
        } catch(err){
            return res.send(err)
        }
    },
    getDocuments: async (req, res, next) => {
        try{
            let documents = await gatewayRepository.listDocuments(req, res, next)              
            res.send(documents)
        }catch(err){
            res.send(err)
        }
    },
    sendDocuments: async (req, res, next) => {
        try{
            let documents = await gatewayRepository.listDocuments(req, res, next)              
            res.send(documents)
        }catch(err){
            res.send(err)
        }
    },
    createOrder: async (req, res, next) => {
        try{
            let charge = await gatewayRepository.createOrder(req, res, next)        
            res.send(charge)
        }catch(err){
            res.send(err)
        }
    },
    cancelOrder: async (req, res, next) => {
        try{
            let canceledOrder = await gatewayRepository.cancelOrder(req, res, next)        
            res.json(canceledOrder)
        }catch(err){
            res.json(err)
        }
    },
    sendPayment: async (req, res, next) => {
        try{
            let payment = await gatewayRepository.sendPayment(req, res, next)             
            res.send(payment)
        }catch(err){
            res.send(err)
        }
    },
    createTokenCard: async (req, res, next) => {
        try{
            let card = await gatewayRepository.createTokenCard(req, res, next)          
            res.json(card)
        }catch(err){
            res.json(err)
        }
    }
}

module.exports = gatewayController;
