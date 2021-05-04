const chargeController = require("../controllers/chargeController");

module.exports = (app) => {
    app.post("/charge", chargeController.createCharge);
}
