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
        try{
            let parter = await partnerRepository.update(req.headers.authorization, req.body)
            
            if(parter.error){
                throw new Error(parter.response.data)
            }
            
            return res.status(200).json(parter.data)
        }catch(err){
            return res.status(400).json(err.stack)
        }
    },
    
    renderRegister: async (req, res, next) => {   
        res.render("partner/registerPartner", {
            layout: "layouts/default"
        })
    },

    renderProfile: async (req, res, next) => {
        let token = `Bearer ${req.cookies['token']}` 
        let data = req.cookies['_luaneletro-logged']
        let typeUser = req.cookies['_luaneletro-user-type']
        let logged = false

        logged = data == undefined ? false : JSON.parse(data)
        typeUser = typeUser == undefined ? "" : typeUser

        if(logged && typeUser === "PARTNER" ){            
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
        }else{
            res.redirect('/');
        }
    },

    renderFinancial: async (req, res, next) => {
        let token = `Bearer ${req.cookies['token']}`
        let data = req.cookies['_luaneletro-logged']
        let typeUser = req.cookies['_luaneletro-user-type']
        let logged = false

        logged = data == undefined ? false : JSON.parse(data)
        typeUser = typeUser == undefined ? "" : typeUser

        if(logged && typeUser === "PARTNER" ){            
                
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
        }else{
            res.redirect('/');
        }

    },
}

module.exports = partnerController;
