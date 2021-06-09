const controller = require("../controllers/order.controller");

module.exports = (app) => {
    app.get("/orders/checkout", controller.renderCheckout);
    app.get("/orders/user", controller.renderUser);
    app.get("/orders/partner", controller.renderPartner);
    app.put("/orders/cancel", controller.cancel)

    app.post("/orders", controller.create);
}
