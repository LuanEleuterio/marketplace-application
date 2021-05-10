const AuthenticateRouter = require("./authenticate.router");
const UserRouter = require("./user.router");
const PartnerRouter = require("./partner.router");
const GatewayRouter = require("./gateway.router");

module.exports = (app) => {
    AuthenticateRouter(app);
    UserRouter(app);
    PartnerRouter(app);
    GatewayRouter(app);
};
