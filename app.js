const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require('cookie-parser')

app.use(cors());
app.use(cookieParser())
app.use(express.json());
app.use(express.static('public'));

require("./routes/index.router")(app);

app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('/', (req, res, next) =>{
    res.render('index')
})

app.listen(8081, function () {
    console.log("CORS-enabled web server listening on port 8081");
});
