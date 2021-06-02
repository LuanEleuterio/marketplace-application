const userController = require("../controllers/user.controller");

module.exports = (app) => {
    app.get("/user/register", userController.renderRegister);
    app.get("/user/profile", userController.renderProfile);
    app.post("/user", userController.create);
    app.put("/user", userController.update);
};
