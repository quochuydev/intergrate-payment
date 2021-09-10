// AfGmYK4Xt69c08NohOXxoRJmU8PckFnuCGbeRTDgdQ1lFd6M6di3PFvG7Ld1s3QkU71ia6Crc-lY3Ngo
// EAvN6wfKFZN07EXwPWiADoK32zpNXl4W6u_xFXYzHJoVJB1ZLG2G7e7M2PyJwQEFOSOWep2yIwtK8buc

// sb-pzyfr3931014@business.example.com
// I_P/7{uT

// sb-e22vg5931825@personal.example.com
// "R*Y$1oE

const express = require("express");
const app = express.Router();

app.get("/return", function (req, res) {
  const url = `https://api-m.sandbox.paypal.com/v2/checkout/orders/${req.query.token}/capture`;
  const token = `token`;
  const options = {
    method: "POST",
    url,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  };

  request(options, function (error, response) {
    if (error) {
      return res.send(error);
    }

    console.log(response.body);
    res.send(response.body);
  });
});

// https://bidbid-local.requestcatcher.com
app.post("/transactions/paypal-webhook", function (req, res) {
  res.send(req.body);
});

module.exports = app;
