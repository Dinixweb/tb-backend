// eslint-disable-next-line @typescript-eslint/no-var-requires
import Api400Error from "../../global/errors/Api400Error";
import Stripe from "stripe";
const d = new Date();
const LIVE_KEY = process.env.STRIPE_SECRET_KEY;
const stripe = new Stripe(LIVE_KEY, { apiVersion: "2022-11-15" });

export async function paymentInitialize(request, response) {
  const { method, cardNumber, exp_month, exp_year, cvv, amount } = request.body;
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

    response.send(paymentIntent);
  } catch (err) {
    console.log(err);
    response.send(new Api400Error());
  }
}
