const controller = require("../controllers/gateway.controller");

module.exports = (app) => {
    app.post("/digital-account", controller.createDigitalAccount);
}
