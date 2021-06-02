const AuthenticateRouter = require("./authenticate.routes");
const UserRouter = require("./user.routes");
const PartnerRouter = require("./partner.routes");
const GatewayRouter = require("./gateway.routes");
const ProductRouter = require("./product.routes");
const OrderRouter = require("./order.routes");
const CardRouter = require("./card.routes");

module.exports = (app) => {
    AuthenticateRouter(app);
    UserRouter(app);
    PartnerRouter(app);
    GatewayRouter(app);
    ProductRouter(app);
    OrderRouter(app);
    CardRouter(app);
};
