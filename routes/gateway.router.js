const gatewayController = require("../controllers/gateway.controller");

module.exports = (app) => {
    app.get("/balance", gatewayController.getBalance);
    app.get("/documents", gatewayController.getDocuments);
    app.get("/banks", gatewayController.getBanks);
    app.get("/business-areas", gatewayController.getBusiness);
    app.get("/bank-business", gatewayController.getBankAndBusiness);

    app.post("/documents", gatewayController.sendDocuments);
    app.post("/order", gatewayController.createOrder);
    app.post("/payment", gatewayController.sendPayment);
    app.post("/tokenization", gatewayController.createTokenCard);

    app.put("/order/cancel/:orderId", gatewayController.cancelOrder)
}
