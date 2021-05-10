const userController = require("../controllers/user.controller");

module.exports = (app) => {
    app.post("/register-user", userController.register);
    app.get("/register-user", userController.renderRegister);
};
