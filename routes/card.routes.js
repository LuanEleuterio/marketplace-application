const CardsController = require("../controllers/card.controller");

module.exports = (app) => {
    app.put("/user/cards/cancel/:cardId", CardsController.delete);
    app.get("/user/cards", CardsController.renderCards);
    app.get("/cards", CardsController.renderPartialsCards);
    app.post("/card", CardsController.create);
};
