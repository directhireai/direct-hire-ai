import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { PRICE_IDS } from '../../../lib/stripe/prices';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { priceId, userId } = req.body;

  if (!priceId || !userId) {
    return res.status(400).json({ error: 'Missing required parameters: priceId or userId' });
  }

  try {
    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      metadata: {
        userId,
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
      customer_update: {
        address: 'auto',
        shipping: 'auto',
      },
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout session creation error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
