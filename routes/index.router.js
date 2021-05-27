const AuthenticateRouter = require("./authenticate.router");
const UserRouter = require("./user.router");
const PartnerRouter = require("./partner.router");
const GatewayRouter = require("./gateway.router");
const ProductRouter = require("./product.router");
const OrderRouter = require("./order.router");
const CardRouter = require("./card.router");

module.exports = (app) => {
    AuthenticateRouter(app);
    UserRouter(app);
    PartnerRouter(app);
    GatewayRouter(app);
    ProductRouter(app);
    OrderRouter(app);
    CardRouter(app);
};
