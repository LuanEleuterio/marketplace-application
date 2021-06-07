const authController = require("../controllers/authenticate.controller");

module.exports = (app) => {
    app.get("/auth/user", authController.renderAuthUser);
    app.get("/auth/partner", authController.renderAuthPartner);
    
    app.post("/auth", authController.getAuth);
    app.get("/auth", authController.renderAuth);
};
