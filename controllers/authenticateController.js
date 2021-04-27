const api = require("../core/api")

const authenticateController = {
    getAuth: async (req, res, next) => {
        const body = req.body

        let request = await api("POST", "/auth", body)

        //console.log(request)
        
        res.send(request.data)
        //res.render("home", {"obj": "Ola"})
   
        
    }
} 


module.exports = authenticateController
