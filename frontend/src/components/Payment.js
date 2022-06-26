import '../componentsStyles/Payment.scss';
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import PaymentForm from "../from/PaymentForm"

const Payment = () => {
    const stripeTestPromise = loadStripe(process.env.STRIPE_PUBLIC)

    return (
        <Elements stripe={stripeTestPromise}>
            <PaymentForm />
        </Elements>
    )
}

export default Payment