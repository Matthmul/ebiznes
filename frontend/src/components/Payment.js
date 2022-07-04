import '../componentsStyles/Payment.scss';
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import PaymentForm from "../form/PaymentForm"

const Payment = () => {
    const STRIPE_PUBLIC = 'process.env.STRIPE_PUBLIC'
    const stripeTestPromise = loadStripe(STRIPE_PUBLIC)

    return (
        <Elements stripe={stripeTestPromise}>
            <PaymentForm />
        </Elements>
    )
}

export default Payment