const ProductController = require("../controllers/product.controller");

module.exports = (app) => {
    app.get("/render/products/partial", ProductController.renderPartialProducts);

    app.get("/product/edit/:productId", ProductController.renderProductEdit);
    app.get("/product/details/:productId", ProductController.renderProduct);

    app.get("/product/register", ProductController.renderProductRegister);
    app.get("/product/shipping", ProductController.calculateShipping);
    app.get("/product/carrinho", ProductController.renderCarrinho);
    app.get("/partner/products", ProductController.renderFormProduct);

    app.delete("/product/:productId", ProductController.delete);

    app.post("/product", ProductController.create);
    app.put("/product", ProductController.update);  

    app.get("/", ProductController.renderProducts);
};
