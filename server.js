const path = require('path');
const express = require('express');
const Stripe = require('stripe');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('La variable STRIPE_SECRET_KEY est requise.');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const products = {
  apple_50: {
    name: 'Carte cadeau Apple 50€',
    amount: 5000
  },
  nike_75: {
    name: 'Carte cadeau Nike 75€',
    amount: 7500
  },
  amazon_100: {
    name: 'Carte cadeau Amazon 100€',
    amount: 10000
  }
};

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/create-checkout-session', async (req, res) => {
  const { productId } = req.body;
  const product = products[productId];

  if (!product) {
    return res.status(400).json({ error: 'Produit invalide.' });
  }

  try {
    const baseUrl = process.env.BASE_URL || `http://localhost:${PORT}`;

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'eur',
            unit_amount: product.amount,
            product_data: {
              name: product.name
            }
          }
        }
      ],
      success_url: `${baseUrl}/success.html`,
      cancel_url: `${baseUrl}/cancel.html`
    });

    return res.json({ url: session.url });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur prêt sur http://localhost:${PORT}`);
});
