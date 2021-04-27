const balanceController = require("../controllers/balanceController");

module.exports = (app) => {
    app.get("/balance", balanceController.getBalance);
};
