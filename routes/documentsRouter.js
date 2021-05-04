const documentsController = require("../controllers/documentsController");

module.exports = (app) => {
    app.get("/documents", documentsController.getDocuments);
}
