const gatewayController = require("../controllers/gateway.controller");

module.exports = (app) => {
    app.get("/balance", gatewayController.getBalance);
    app.get("/documents", gatewayController.getDocuments);
    app.get("/banks", gatewayController.getBanks);
    app.get("/business-areas", gatewayController.getBusiness);
    app.get("/bank-business", gatewayController.getBankAndBusiness);

    app.post("/digital-account", gatewayController.createDigitalAccount);
    app.post("/documents", gatewayController.sendDocuments);
    app.post("/charge", gatewayController.createCharge);
    app.post("/payment", gatewayController.sendPayment);
    app.post("/tokenization", gatewayController.createTokenCard);

    app.put("/charge/cancel/:orderId", gatewayController.cancelCharge)
}
