import { useContext, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { paymentHook } from "../hooks/paymentHook";
import { CartContext } from "../context/cartContext";
import FinalizeOrder from "../pages/FinalizeOrder";

const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#c4f0ff",
            color: "#fff",
            fontWeight: 500,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": { color: "#fce883" },
            "::placeholder": { color: "#87bbfd" }
        },
        invalid: {
            iconColor: "#ffc7ee",
            color: "#ffc7ee"
        }
    }
}

const PaymentForm = () => {
    const { sendProductsInCart } = useContext(CartContext)
    const [success, setSuccess] = useState(false)
    const stripe = useStripe()
    const elements = useElements()
    const { products } = useContext(CartContext)
    const itemsPrice = products.reduce((a, c) => a + c.quantity * c.item.price, 0);

    const sendForm = async (values, itemsPrice) => {
        paymentHook.sendPayment(values, itemsPrice).then(
            (paymentStatus) => {
                console.log(paymentStatus);
                sendProductsInCart(paymentStatus.id)
                setSuccess(true)
            },
            () => {
                console.error("Błąd płatności")
                alert("Błąd płatności")
            });
    };

    const handleSubmitForm = async (values, itemsPrice) => {
        values.preventDefault()
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })

        if (!error) {
            const { id } = paymentMethod

            sendForm(id, itemsPrice * 100)
        }
    }

    return (
        <>
            {!success ?
                <div>
                    <form onSubmit={(values) => {
                        handleSubmitForm(values, itemsPrice)
                    }}>
                        <fieldset className="FormGroup">
                            <div className="FormRow">
                                <CardElement options={CARD_OPTIONS} />
                            </div>
                        </fieldset>
                        <button>Zapłać</button>
                    </form>
                    <h2>Do zapłaty</h2>
                    <pre>{itemsPrice} PLN</pre>
                </div>
                :
                <FinalizeOrder />
            }
        </>
    )
}

export default PaymentForm