const api = require("../core/api");
const gatewayController = require("./gateway.controller")

const partnerController = {
    register: async (req, res, next) => {
        let request = await api("POST", "/register-partner", req.body)

        return res.send(request.data)
    },
    renderRegister: async (req, res, next) => {
        const bankAndBusiness = await gatewayController.getBankAndBusiness()
        
        res.render("registerPartner", {data: bankAndBusiness})
    }
}

module.exports = partnerController;
