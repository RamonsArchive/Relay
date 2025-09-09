import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY_TEST;

if (!stripeSecretKey) {
  throw new Error("Missing STRIPE_SECRET_KEY_TEST in environment");
}

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2025-08-27.basil", // or latest stable version
});