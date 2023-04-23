import { PaymentReferrence } from "../../global/utils/global_function";
import Api400Error from "../../global/errors/Api400Error";
import * as Modals from "../../global/models";
import Stripe from "stripe";
const d = new Date();
const LIVE_KEY = process.env.STRIPE_SECRET_KEY;
const stripe = new Stripe(LIVE_KEY, { apiVersion: "2022-11-15" });

export async function paymentInitialize(request, response) {
  const {
    method,
    cardNumber,
    exp_month,
    exp_year,
    cvv,
    amount,
    userId,
    email,
  } = request.body;
  try {
    const paymentMethod = await stripe.paymentMethods.create({
      type: method,
      card: {
        number: cardNumber,
        exp_month: exp_month,
        exp_year: exp_year,
        cvc: cvv,
      },
    });
    const paymentIntent = await stripe.paymentIntents.create({
      payment_method: paymentMethod.id,
      amount: amount * 100,
      currency: "usd",
      confirm: true,
      payment_method_types: ["card"],
    });
    if (paymentIntent.status === "succeeded") {
      const paymentData = {
        amount: paymentIntent.amount_received,
        userId: userId,
        created: paymentIntent.created,
        referenceNo: PaymentReferrence(),
        canceled_at: paymentIntent.canceled_at,
        currency: paymentIntent.currency,
        paymentMethod: paymentIntent.payment_method_types[0],
        status: paymentIntent.status,
        receipt_email: email,
      };
      const addPayment = Modals.UserModels.Payments;
      await addPayment.create(paymentData);
    }

    response.send(paymentIntent);
  } catch (err) {
    console.log(err);
    response.send(new Api400Error());
  }
}
