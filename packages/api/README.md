# API

## Stripe integration

To test Stripe integration, you need to create a Stripe account and get the API keys.

Then, you need to add in your `packages/api/.env` file in the following content:

```bash
STRIPE_PUBLIC_KEY=<YOUR_STRIPE_PUBLIC_KEY>
STRIPE_SECRET_KEY=<YOUR_STRIPE_SECRET_KEY>
STRIPE_WEBHOOK_SECRET=<YOUR_STRIPE_WEBHOOK_SECRET>
```

To test the webhook integration, you need to install the [Stripe CLI](https://stripe.com/docs/stripe-cli) and run the following commands:

```bash
# Make sure the app is running first with `npm start`
stripe login
stripe listen --forward-to localhost:7071/api/checkout/complete
```

Then you can trigger events such as:

```bash
stripe trigger payment_intent.succeeded
```

