const partnerController = require("../controllers/partner.controller");

module.exports = (app) => {
    app.post("/register-partner", partnerController.register);
    app.get("/register-partner", partnerController.renderRegister);
};
