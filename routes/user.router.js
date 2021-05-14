const userController = require("../controllers/user.controller");

module.exports = (app) => {
    app.get("/products", userController.renderProducts);
    app.get("/user/register", userController.renderRegister);
    app.get("/user/profile", userController.renderProfile);
    app.get("/user/orders", userController.renderOrders);
    app.get("/user/cards", userController.renderCards);

    app.post("/user", userController.register);

    app.put("/user/cards/cancel/:cardId", userController.cancelCard);
};
