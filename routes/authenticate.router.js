const authController = require("../controllers/authenticate.controller");

module.exports = (app) => {
    app.post("/auth", authController.getAuth);
    app.get("/auth", authController.renderAuth);
};
