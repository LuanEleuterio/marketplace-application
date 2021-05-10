const api = require("../core/api");

const userController = {
    register: async (req, res, next) => {

        let request = await api("POST", "/register-user", req.body)

        return res.send(request.data)
    },
    renderRegister: async (req, res, next) => {
        res.render("examples")
    }
}

module.exports = userController;
