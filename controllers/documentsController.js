const api = require("../core/api");

const documentsController = {
    getDocuments: async (req, res, next) => {

        const config = {
            authorization: req.headers.authorization
        }
          
        let request = await api("GET", "/documents", {}, config)
        
        res.send(request.data)
    }
}

module.exports = documentsController;
