const controller = require("../controllers/product.controller");

module.exports = (app) => {
    app.get("/product/render/partial", controller.renderPartialProducts);

    app.get("/product/edit/:productId", controller.renderProductEdit);
    app.get("/product/details/:productId", controller.renderProduct);

    app.get("/product/register", controller.renderProductRegister);
    app.get("/product/shipping", controller.calculateShipping);
    app.get("/product/carrinho", controller.renderCarrinho);
    app.get("/partner/products", controller.renderFormProduct);

    app.delete("/product/:productId", controller.delete);

    app.post("/product", controller.create);
    app.put("/product", controller.update);  

    app.get("/", controller.renderProducts);
};
