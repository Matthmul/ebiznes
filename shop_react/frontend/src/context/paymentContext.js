import { createContext, useContext } from "react";
import { CartContext } from "./cartContext";
import { cartHook } from "../hooks/cartHook";
import { paymentHook } from "../hooks/paymentHook";
import Payment from 'payment'

export const PaymentContext = createContext({
    handleSubmitForm: () => {
    },
    formatCreditCardNumber: () => {
    },
    formatCVC: () => {
    },
    formatExpirationDate: () => {
    },
    fieldsCorrect: () => {
    }
});

export const PaymentContextProvider = ({ children }) => {
    const { products } = useContext(CartContext)

    const sendForm = (values) => {
        let paymentValue = products.reduce((a, c) => a + c.quantity * c.item.price, 0)
        paymentHook.sendPayment({ ...values, value: paymentValue }).then(
            (paymentStatus) => {
                console.log(paymentStatus);
                cartHook.sendProducts({ ...products }).then(
                    (paymentStatus) => {
                        console.log(paymentStatus);
                    },
                    () => {
                        console.error("Błąd koszyka")
                        alert("Błąd koszyka")
                    });
            },
            () => {
                console.error("Błąd płatności")
                alert("Błąd płatności")
            });
    };

    const handleSubmitForm = (values) => {
        values.number = formatCreditCardNumber(values.number)
        values.cvc = formatCVC(values.cvc)
        values.expiry = formatExpirationDate(values.expiry)

        sendForm(values)
    }

    const fieldsCorrect = (values) => {
        if (!values.number || !values.name || !values.expiry || !values.cvc) {
            return false;
        }
        return true;
    }

    function clearNumber(value = '') {
        return value.replace(/\D+/g, '')
    }

    const formatCreditCardNumber = (value) => {
        const issuer = Payment.fns.cardType(value)
        const clearValue = clearNumber(value)
        let nextValue

        switch (issuer) {
            case 'amex':
                nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
                    4,
                    10
                )} ${clearValue.slice(10, 15)}`
                break
            case 'dinersclub':
                nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
                    4,
                    10
                )} ${clearValue.slice(10, 14)}`
                break
            default:
                nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
                    4,
                    8
                )} ${clearValue.slice(8, 12)} ${clearValue.slice(12, 19)}`
                break
        }

        return nextValue.trim()
    }

    const formatCVC = (value, prevValue, allValues = {}) => {
        const clearValue = clearNumber(value)
        let maxLength = 4

        if (allValues.number) {
            const issuer = Payment.fns.cardType(allValues.number)
            maxLength = issuer === 'amex' ? 4 : 3
        }

        return clearValue.slice(0, maxLength)
    }

    const formatExpirationDate = (value) => {
        const clearValue = clearNumber(value)

        if (clearValue.length >= 3) {
            return `${clearValue.slice(0, 2)}/${clearValue.slice(2, 4)}`
        }

        return clearValue
    }

    return (
        <PaymentContext.Provider value={{
            handleSubmitForm,
            formatCreditCardNumber,
            formatCVC,
            formatExpirationDate,
            fieldsCorrect
        }}>
            {children}
        </PaymentContext.Provider>
    )
}