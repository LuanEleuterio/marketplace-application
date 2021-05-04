const paymentController = require("../controllers/paymentController");

module.exports = (app) => {
    app.post("/payment", paymentController.sendPayment);
};
