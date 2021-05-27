const ProductController = require("../controllers/product.controller");

module.exports = (app) => {
    app.get("/product/edit/:productId", ProductController.renderProductEdit);
    app.get("/product/details/:productId", ProductController.renderProduct);

    app.get("/product/shipping", ProductController.calculateShipping);
    app.get("/user/carrinho", ProductController.renderCarrinho);
    app.get("/partner/products", ProductController.renderFormProduct);
    app.get("/render/products/partial", ProductController.renderPartialProducts);

    app.delete("/product/:productId", ProductController.delete);

    app.get("/products", ProductController.renderProducts);
    app.post("/product", ProductController.create);
    app.put("/product", ProductController.update);  
};
