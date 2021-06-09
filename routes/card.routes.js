const controller = require("../controllers/card.controller");

module.exports = (app) => {
    app.put("/cards/cancel/:cardId", controller.delete);
    app.get("/cards/user", controller.renderCards);
    app.get("/cards", controller.renderPartialsCards);
    app.post("/cards", controller.create);
};
