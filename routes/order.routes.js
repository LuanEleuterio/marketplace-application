const OrderController = require("../controllers/order.controller");

module.exports = (app) => {
    app.get("/order/checkout", OrderController.renderCheckout);
    app.get("/user/orders", OrderController.renderUser);
    app.get("/partner/orders", OrderController.renderPartner);

    app.post("/order", OrderController.create);

    app.put("/order/cancel", OrderController.cancel)
}
