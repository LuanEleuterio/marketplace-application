const api = require("../core/api");

const balanceController = {
    getBalance: async (req, res, next) => {

        const config = {
            authorization: req.headers.authorization
        }
          
        let request = await api("GET", "/balance", {}, config)
        
        res.send(request.data)
    }
}

module.exports = balanceController;
