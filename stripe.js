// bb-local
// pk_test_51IvEPFJTAR9d8mS41HRDbWsCivfl6hEoyvOpc5M7PTc79XQ9YPsfGmlu21j9tB34qOcyDGZbnf1v1hacQHwRAoah00PcKf4lRv
// sk_test_51IvEPFJTAR9d8mS4RIcg0Lzpao6m4XZp0DxteDXqvllsnlkeVBaPgNCbvvSiAzy4rvaB2AsEVWhpG0GY1ifTBGs300XzDVI4mL

const express = require("express");
const app = express.Router();

const Stripe = require("stripe");
const stripe = Stripe(
  "sk_test_51IvEPFJTAR9d8mS4RIcg0Lzpao6m4XZp0DxteDXqvllsnlkeVBaPgNCbvvSiAzy4rvaB2AsEVWhpG0GY1ifTBGs300XzDVI4mL"
);

// I. PAYMENT (from user to merchant)

// 1. Create customer
app.get("/stripe/customer", async function (req, res) {
  const result = await stripe.customers.create({
    name: "Huy",
  });
  console.log(result);
  res.send(result);
});

// 2. Setup intent
app.get("/stripe/setup", async function (req, res) {
  const userId = "cus_KCVCdkqAfZf8KB";
  const result = await stripe.setupIntents.create({ customer: userId });
  console.log(result);
  res.send(result);
});

// * Get payment method
app.get("/stripe/paymentMethod/:id", async function (req, res) {
  const result = await stripe.paymentMethods.retrieve(req.params.id);
  console.log(result);
  res.send(result);
});

// 3. Payment intent:
app.post("/stripe/payment", async function (req, res) {
  console.log(req.body.paymentMethodId);
  const userId = "cus_KCVCdkqAfZf8KB";

  const result = await stripe.paymentIntents.create({
    currency: "usd",
    amount: 100,
    customer: userId,
    payment_method: req.body.paymentMethodId,
  });
  console.log(result);

  res.send(result);
});

// google + apple pay

// stripe.applePayDomains
//   .create({
//     domain_name: "93aa96f5bcf2.ngrok.io",
//   })
//   .then((domain) => console.log(domain));

module.exports = app;
