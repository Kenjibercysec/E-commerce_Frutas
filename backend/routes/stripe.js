const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');
const auth = require('../middleware/auth');

// Create payment intent
router.post('/create-payment-intent', auth, async (req, res) => {
    try {
        const { orderId } = req.body;
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Check if user is authorized
        if (order.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(order.totalAmount * 100), // Convert to cents
            currency: 'usd',
            metadata: {
                orderId: order._id.toString()
            }
        });

        res.json({
            clientSecret: paymentIntent.client_secret
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Handle Stripe webhook
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            const orderId = paymentIntent.metadata.orderId;

            // Update order status
            await Order.findByIdAndUpdate(orderId, {
                paymentStatus: 'completed',
                stripePaymentIntentId: paymentIntent.id
            });

            break;
        case 'payment_intent.payment_failed':
            const failedPaymentIntent = event.data.object;
            const failedOrderId = failedPaymentIntent.metadata.orderId;

            // Update order status
            await Order.findByIdAndUpdate(failedOrderId, {
                paymentStatus: 'failed',
                stripePaymentIntentId: failedPaymentIntent.id
            });

            break;
    }

    res.json({ received: true });
});

module.exports = router; 