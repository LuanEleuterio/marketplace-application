const partnerController = require("../controllers/partner.controller");

module.exports = (app) => {
    app.post("/partner", partnerController.register);
    app.post("/product", partnerController.registerProduct);

    app.get("/partner/profile", partnerController.renderProfile);
    app.get("/partner/register", partnerController.renderRegister);
    app.get("/product/register", partnerController.renderFormProduct);
};  