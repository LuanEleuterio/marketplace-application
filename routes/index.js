const BalanceRouter = require("./balanceRouter");
const AuthenticateRouter = require("./authenticateRouter");

module.exports = (app) => {
    BalanceRouter(app);
    AuthenticateRouter(app);
};
