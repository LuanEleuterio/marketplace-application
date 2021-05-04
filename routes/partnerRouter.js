const partnerController = require("../controllers/partnerController");

module.exports = (app) => {
    app.post("/register-partner", partnerController.register);
    app.get("/register-partner", partnerController.renderRegister);
};
