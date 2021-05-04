const BalanceRouter = require("./balanceRouter");
const AuthenticateRouter = require("./authenticateRouter");
const UserRouter = require("./userRouter");
const PartnerRouter = require("./partnerRouter");
const ChargeRouter = require("./chargeRouter");
const PaymentRouter = require("./paymentRouter");
const BankAndBusinessRouter = require("./bankAndBusinessRouter");
const DocumentsRouter = require("./documentsRouter");
const TokenizationRouter = require("./tokenizationRouter");

module.exports = (app) => {
    BalanceRouter(app);
    AuthenticateRouter(app);
    UserRouter(app);
    PartnerRouter(app);
    ChargeRouter(app);
    PaymentRouter(app);
    BankAndBusinessRouter(app);
    DocumentsRouter(app);
    TokenizationRouter(app);
};
