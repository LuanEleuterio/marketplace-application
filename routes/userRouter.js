const userController = require("../controllers/userController");

module.exports = (app) => {
    app.post("/register-user", userController.register);
    app.get("/register-user", userController.renderRegister);
};
