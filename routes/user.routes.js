const controller = require("../controllers/user.controller");

module.exports = (app) => {
    app.get("/user/register", controller.renderRegister);
    app.get("/user/profile", controller.renderProfile);
    app.post("/user", controller.create);
    app.put("/user", controller.update);
};
