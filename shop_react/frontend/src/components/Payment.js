import '../componentsStyles/Payment.scss';
import { PaymentContext } from "../context/paymentContext";
import { useContext } from "react";
import { Form, Field } from 'react-final-form'
import { CartContext } from "../context/cartContext";
import { useNavigate } from "react-router-dom";

const Payment = () => {
    const { formatExpirationDate, formatCVC, formatCreditCardNumber, handleSubmitForm, fieldsCorrect } = useContext(PaymentContext)
    const { products } = useContext(CartContext)
    const navigate = useNavigate();

    return (
        <>
            <Form
                onSubmit={(values) => {
                    handleSubmitForm(values);
                    navigate('/finalOrder');
                }}
                render={({
                    handleSubmit,
                    form,
                    submitting,
                    pristine,
                    values,
                    _active
                }) => {
                    return (
                        <form onSubmit={handleSubmit}>
                            <div>
                                <Field
                                    name="number"
                                    component="input"
                                    type="text"
                                    pattern="[\d| ]{16,22}"
                                    placeholder="Card Number"
                                    format={formatCreditCardNumber}
                                />
                            </div>
                            <div>
                                <Field
                                    name="name"
                                    component="input"
                                    type="text"
                                    placeholder="Name"
                                />
                            </div>
                            <div>
                                <Field
                                    name="expiry"
                                    component="input"
                                    type="text"
                                    pattern="\d\d/\d\d"
                                    placeholder="Valid Thru"
                                    format={formatExpirationDate}
                                />
                                <Field
                                    name="cvc"
                                    component="input"
                                    type="text"
                                    pattern="\d{3,4}"
                                    placeholder="CVC"
                                    format={formatCVC}
                                />
                            </div>
                            <div className="buttons">
                                <button type="submit" disabled={submitting || !fieldsCorrect(values)}>
                                    Wyślij
                                </button>
                                <button
                                    type="button"
                                    onClick={form.reset}
                                    disabled={submitting || pristine}
                                >
                                    Reset
                                </button>
                            </div>
                            <h2>Do zapłaty</h2>
                            <pre>{products.reduce((a, c) => a + c.quantity * c.item.price, 0)} PLN</pre>
                        </form>
                    )
                }}
            />
        </>
    )
}

export default Payment