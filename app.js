const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

require("./routes/index")(app);

app.set('view engine', 'ejs');
app.set('views', 'views');

app.listen(8081, function () {
    console.log("CORS-enabled web server listening on port 8081");
});
