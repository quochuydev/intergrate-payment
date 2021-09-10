const express = require("express");

var bodyParser = require("body-parser");
var cors = require("cors");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(cors());

const paypalRoute = require("./paypal");
const stripeRoute = require("./stripe");

app.get("/", function (req, res) {
  res.render("index");
});

app.use(paypalRoute);
app.use(stripeRoute);

app.listen(8080, () => {
  console.log("http://localhost:8080/stripe/setup");
  console.log("http://localhost:8080/");
});
