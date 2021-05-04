const api = require("../core/api");

const tokenizationController = {
    createTokenCard: async (req, res, next) => {

        const config = {
            authorization: req.headers.authorization
        }

        let request = await api("POST", "/tokenization", req.body, config)

        return res.send(request.data)
    }
}

module.exports = tokenizationController;
