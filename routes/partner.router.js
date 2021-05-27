const partnerController = require("../controllers/partner.controller");

module.exports = (app) => {
    app.get("/partner/profile", partnerController.renderProfile);
    app.get("/partner/financial", partnerController.renderFinancial);
    app.get("/partner/register", partnerController.renderRegister);

    app.post("/partner", partnerController.create);
    app.put("/partner", partnerController.update);
};  