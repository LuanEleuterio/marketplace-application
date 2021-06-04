const OrderController = require("../controllers/order.controller");

module.exports = (app) => {
    app.get("/orders/checkout", OrderController.renderCheckout);
    app.get("/orders/user", OrderController.renderUser);
    app.get("/orders/partner", OrderController.renderPartner);
    app.put("/orders/cancel", OrderController.cancel)

    app.post("/orders", OrderController.create);
}
