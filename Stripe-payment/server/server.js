require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

// Webhook route needs raw body BEFORE express.json() parses it
app.use("/webhook", express.raw({ type: "application/json" }));

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5500", "http://127.0.0.1:5500"],
  }),
);

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const storeItems = new Map([
  [1, { priceInCents: 10000, name: "Painting 1" }],
  [2, { priceInCents: 20000, name: "Painting 2" }],
]);

app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item) => {
        const storeItem = storeItems.get(item.id);
        if (!storeItem)
          return res.status(400).json({ error: `Unknown item id: ${item.id}` });
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.CLIENT_URL}/success.html`,
      cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/webhook", (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (e) {
    console.log("Webhook signature verification failed:", e.message);
    return res.status(400).send(`Webhook Error: ${e.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    console.log("Payment successful!");
    console.log("  Session ID:", session.id);
    console.log("  Amount paid:", session.amount_total / 100, session.currency.toUpperCase());
    console.log("  Customer email:", session.customer_details?.email);
    // In a real app: save order to database, send confirmation email, etc.
  }

  res.json({ received: true });
});

app.listen(3000, () => console.log("Server running on port 3000"));
