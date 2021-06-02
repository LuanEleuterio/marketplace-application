const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser')
const expressLayouts = require('express-ejs-layouts')

const app = express();

app.use(cors());
app.use(cookieParser())
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(expressLayouts);
app.set("layout", "/layouts");

require("./routes/index.routes")(app);

app.listen(8081, function () {
    console.log("CORS-enabled web server listening on port 8081");
});
