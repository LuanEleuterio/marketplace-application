//Repositories
const gatewayRepository = require("../repositories/gateway.repository")
const partnerRepository = require("../repositories/partner.repository")
const orderRepository = require("../repositories/order.repository")


//Helpers
const financialHelper = require('../helpers/financial.helper')
const { totalSold } = require("../helpers/financial.helper")

const partnerController = {
    create: async (req, res, next) => {
        let parter = await partnerRepository.register(req, res, next)
        return res.json(parter)
    },

    update: async (req, res, next) => {
        let parter = await partnerRepository.updatePartner(req, res, next)
        return res.json(parter)
    },
    
    renderRegister: async (req, res, next) => {
        //const bankAndBusiness = await gatewayRepository.listBankAndBusiness(req, res, next)    
        res.render("partner/registerPartner", {data: undefined})
    },

    renderProfile: async (req, res, next) => {
        let token = req.cookies['token']
        req.headers.authorization = `Bearer ${token}`

        const partner = await partnerRepository.listPartner(req, res, next)
        const bankAndBusiness = await gatewayRepository.listBankAndBusiness(req, res, next)    

        let documents

        if(partner.signUpCompleted && partner.hasJunoAccount){
            data = await gatewayRepository.listDocuments(req, res, next)
            documents = data._embedded.documents
        }

        res.render("partner/profile", {
            partner: partner, 
            documents,
            bankAndBusiness
        })
    },

    renderFinancial: async (req, res, next) => {
        const dataFinancial = {
            totalSold: 0,
            expectedSalesValues: 0,
            sales: {}
        } 

        let token = `Bearer ${req.cookies['token']}`
        req.headers.authorization = token

        const balance = await gatewayRepository.balance(req, res, next)
        const orders = await orderRepository.listByPartner(token)
        
        let sales = {}
        let totalSold = 0
        let expectedSalesValues = 0
        let concludedSales = 0
        let expectedSales = 0
        let canceledSales = 0

        for(order of orders.data){
            let arrDetails = order.details
            totalSold += parseFloat(await financialHelper.totalSold(arrDetails))
            expectedSalesValues += parseFloat(await financialHelper.expectedSale(arrDetails))
            sales = await financialHelper.sales(arrDetails)

            concludedSales += parseInt(sales.concludedSales)
            expectedSales += parseInt(sales.expectedSales)
            canceledSales += parseInt(sales.canceledSales)

        }
        dataFinancial.sales.concludedSales = concludedSales
        dataFinancial.sales.expectedSales = expectedSales
        dataFinancial.sales.canceledSales = canceledSales
        dataFinancial.totalSold = totalSold
        dataFinancial.expectedSalesValues = expectedSalesValues
        dataFinancial.juno = balance

        
        res.render("partner/financial", {financial: dataFinancial})
    },
}

module.exports = partnerController;
