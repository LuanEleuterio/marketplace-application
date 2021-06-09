const controller = require("../controllers/partner.controller");

module.exports = (app) => {
    app.get("/partner/profile", controller.renderProfile);
    app.get("/partner/financial", controller.renderFinancial);
    app.get("/partner/register", controller.renderRegister);

    app.post("/partner", controller.create);
    app.put("/partner", controller.update);
};  