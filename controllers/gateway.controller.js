const gatewayRepository = require('../repositories/gateway.repository')

const gatewayController = {
    createDigitalAccount: async (req, res, next) => {
        try{
            let digitalAccount = await gatewayRepository.createDigitalAccount(req.headers.authorization, req.body)  
            
            if(digitalAccount?.response?.data?.error){
                throw new Error(digitalAccount.response.data)
            }

            res.status(201).json(digitalAccount.data)
        }catch(err){
            res.status(400).json(err.stack)
        }
    }
}

module.exports = gatewayController;
