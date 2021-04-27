const api = require("../core/api");

const balanceController = {
    getBalance: async (req, res, next) => {
          
        let request = await api("GET", "/balance")
        
        res.render("home", {'obj':request.data.balance})
    }
}

module.exports = balanceController;
