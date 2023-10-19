import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { buffer } from "micro";
const stripe = require('stripe')(process.env.STRIPE_SK);

const endpointSecret = "whsec_47a3d6cdb063c974f8021c6916a0333b4786e874e22d0b412cc55100555b9405";

export default async function handler(req,res) {
    await mongooseConnect();
    const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const data = event.data.object;
      const orderId = data.metadata.orderId;
      const paid = data.payment_status === 'paid';
      if (orderId && paid) {
        await Order.findByIdAndUpdate(orderId,{
            paid:true,
        })
      }
      break;
    
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send('ok');
}

export const config = {
    api: {bodyParser:false,}
};

// dote-clever-idol-chaste <= strip CLI verified
// stripe CLI acc ID : acct_1NntU8E1j0O3cXEo