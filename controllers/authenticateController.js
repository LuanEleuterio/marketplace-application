const api = require("../core/api")

const authenticateController = {
    getAuth: async (req, res, next) => {
        try{
            const body = req.body

            let request = await api("POST", "/auth", body)
                     
            res.send(request.data)
        }catch(err){
            res.send(err)
        }
    }
} 

module.exports = authenticateController
