const gatewayRepository = require('../repositories/gateway.repository')

const gatewayController = {
    createDigitalAccount: async (req, res, next) => {
        try{
            let digitalAccount = await gatewayRepository.createDigitalAccount(req.headers.authorization, req.body)  
            res.json(digitalAccount.data)
        }catch(err){
            res.json(err.stack)
        }
    }
}

module.exports = gatewayController;
