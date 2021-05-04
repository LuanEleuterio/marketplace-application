const tokenizationController = require("../controllers/tokenizationController");

module.exports = (app) => {
    app.post("/tokenization", tokenizationController.createTokenCard);
}
