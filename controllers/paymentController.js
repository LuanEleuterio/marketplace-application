const api = require("../core/api")

const paymentController = {
    sendPayment: async (req, res, next) => {
        try{

            const config = {
                authorization: req.headers.authorization
            }

            let request = await api("POST", "/payment", req.body, config)
                              
            res.send(request.data)
        }catch(err){
            res.send(err)
        }
   
        
    }
} 


module.exports = paymentController
