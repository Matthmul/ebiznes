import '../componentsStyles/Payment.scss';
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import PaymentForm from "../form/PaymentForm"

const Payment = () => {
    const STRIPE_PUBLIC = 'pk_test_51LEgHTL0G5tfLaRaqdB7xw8sPxlyunLymkdjfN6S6AvGGnHo8xarUPw7KvF7cpUc9CqXDvlEaOfnoVcckUE9PHIc00djvOImGC'
    const stripeTestPromise = loadStripe(STRIPE_PUBLIC)

    return (
        <Elements stripe={stripeTestPromise}>
            <PaymentForm />
        </Elements>
    )
}

export default Payment