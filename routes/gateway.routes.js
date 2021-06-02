const gatewayController = require("../controllers/gateway.controller");

module.exports = (app) => {
    app.post("/digital-account", gatewayController.createDigitalAccount);
}
