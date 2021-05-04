const api = require("../core/api");

const chargeController = {
    createCharge: async (req, res, next) => {

        const config = {
            authorization: req.headers.authorization
        }

        let request = await api("POST", "/charge", req.body, config)

        return res.send(request.data)
    }
}

module.exports = chargeController;
