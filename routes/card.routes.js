const CardsController = require("../controllers/card.controller");

module.exports = (app) => {
    app.put("/cards/cancel/:cardId", CardsController.delete);
    app.get("/cards/user", CardsController.renderCards);
    app.get("/cards", CardsController.renderPartialsCards);
    app.post("/card", CardsController.create);
};
