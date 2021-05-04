const api = require("../core/api")
const partnerController = require("./partnerController")

const bankAndBusinessController = {
    getBanks: async (req, res, next) => {
        try{
            let request = await api("GET", "/banks")

            console.log("res ", request.data)

            return res.send(request.data)
        } catch(err){
            return res.status(400).send(err)
        }
    },
    getBusiness: async (req, res, next) => {
        try{
            let request = await api("GET", "/business-areas")

            console.log("res ", request.data)

            return res.send(request.data)
        } catch(err){
            return res.status(400).send(err)
        }
    },
    getBankAndBusiness: async (req, res, next) => {
        let bankAndBusiness = {}
        try{
            let requestBank = await api("GET", "/banks")
            let requestBusiness = await api("GET", "/business-areas")

            bankAndBusiness.banks = requestBank.data._embedded.banks
            bankAndBusiness.businessAreas = requestBusiness.data._embedded.businessAreas

            //partnerController.renderRegister(req, res, bankAndBusiness)
            //res.render("registerPartner", {data: bankAndBusiness})
            return bankAndBusiness
        } catch(err){
            return res.status(400).send(err)
        }
    }
}

module.exports = bankAndBusinessController