const controller = require("../controllers/authenticate.controller");

module.exports = (app) => {
    app.get("/auth/user", controller.renderAuthUser);
    app.get("/auth/partner", controller.renderAuthPartner);
    app.post("/auth", controller.getAuth);
};
