const gatewayRepository = require("../repositories/gateway.repository")
const partnerRepository = require("../repositories/partner.repository")

const partnerController = {
    register: async (req, res, next) => {
        let parter = await partnerRepository.register(req, res, next)

        return res.json(parter)
    },
    registerProduct: async (req, res, next) =>{       
        let product = await partnerRepository.registerProduct(req, res, next)
        return res.json(product)
    },
    renderRegister: async (req, res, next) => {
        const bankAndBusiness = await gatewayRepository.listBankAndBusiness(req, res, next)    
        res.render("partner/registerPartner", {data: bankAndBusiness})
    },
    renderFormProduct: async (req, res, next) => {
        res.render("partner/product")
    },
    renderProfile: async (req, res, next) => {
        let token = req.cookies['token']
        req.headers.authorization = `Bearer ${token}`

        const partner = await partnerRepository.listPartner(req, res, next)

        console.log(partner)
        res.render("partner/profile")
    }
}

module.exports = partnerController;
