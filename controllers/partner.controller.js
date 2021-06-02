//Repositories
const gatewayRepository = require("../repositories/gateway.repository")
const partnerRepository = require("../repositories/partner.repository")
const orderRepository = require("../repositories/order.repository")


//Helpers
const financialHelper = require('../helpers/financial.helper')
const { totalSold } = require("../helpers/financial.helper")

const partnerController = {
    create: async (req, res, next) => {
        let parter = await partnerRepository.register(req.body)

        res.cookie('token', parter.data.token, {
            maxAge: 86400 * 1000, // 24 hours
            httpOnly: true, // http only, prevents JavaScript cookie access
            secure: true // cookie must be sent over https / ssl
        });

        res.cookie('partner-id', parter.data.partnerId, {
            maxAge: 86400 * 1000, // 24 hours
            httpOnly: true, // http only, prevents JavaScript cookie access
            secure: true // cookie must be sent over https / ssl
        });
        
        return res.json(parter.data)
    },

    update: async (req, res, next) => {
        let parter = await partnerRepository.update(req.headers.authorization, req.body)
        return res.json(parter.data)
    },
    
    renderRegister: async (req, res, next) => {   
        res.render("partner/registerPartner", {
            layout: "layouts/default"
        })
    },

    renderProfile: async (req, res, next) => {
        let token = `Bearer ${req.cookies['token']}` 
        let bankAndBusiness = {}

        const partner = await partnerRepository.list(token)
        const banks = await gatewayRepository.listBanks()    
        const business = await gatewayRepository.listBusiness()  

        bankAndBusiness.banks = banks.data._embedded.banks
        bankAndBusiness.businessAreas = business.data._embedded.businessAreas
        
        let documents

        if(partner.data.partner.signUpCompleted && partner.data.partner.hasJunoAccount){
            data = await gatewayRepository.listDocuments(token)
            documents = data._embedded.documents
        }

        res.render("partner/profile", {
            layout: 'layouts/partner',
            partner: partner.data.partner, 
            documents,
            bankAndBusiness
        })
    },

    renderFinancial: async (req, res, next) => {
        let token = `Bearer ${req.cookies['token']}`

        const dataFinancial = {
            totalSold: 0,
            expectedSalesValues: 0,
            sales: {}
        } 

        const balance = await gatewayRepository.balance(token)
        const orders = await orderRepository.listByPartner(token)
        
        let sales = {}
        let totalSold = 0
        let expectedSalesValues = 0
        let concludedSales = 0
        let expectedSales = 0
        let canceledSales = 0

        console.log(orders)

        for(order of orders.data.orders){
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
        dataFinancial.juno = balance.data

        
        res.render("partner/financial", {
            layout: 'layouts/partner',
            financial: dataFinancial
        })
    },
}

module.exports = partnerController;
