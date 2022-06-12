import { useState, createContext } from "react";
import { cartHook } from "../hooks/cartHook";

export const CartContext = createContext({
    products: [],
    addProduct: () => {
        // Intentional empty
    },
    removeProduct: () => {
        // Intentional empty
    },
    removeAllProducts: () => {
        // Intentional empty
    },
    sendProductsInCart: () => {
        // Intentional empty
    },
});

export const CartContextProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    const addProduct = (newProduct) => {
        let productInCart = products.findIndex((product) => product.item.id === newProduct.id);
        if (productInCart !== -1) {
            products[productInCart].quantity = products[productInCart].quantity + 1;
            setProducts([...products])
        } else {
            setProducts([...products, { item: { ...newProduct }, quantity: 1 }])
        }
    }

    const sendProductsInCart = (paymentId) => {
        if (products.length !== 0)
            cartHook.sendProducts(paymentId, ...products).then(
                (status) => {
                    console.log(status);
                    products.length = 0
                },
                () => {
                    console.error("Błąd koszyka")
                    alert("Błąd koszyka")
                });
    }

    const removeProduct = (product) => {
        let updatedProducts = products.map((item) => {
            if (item.item.id === product.id) {
                item.quantity = item.quantity - 1;
            }

            return item;
        })

        setProducts(checkZeroQuantity(updatedProducts));
    }

    function checkZeroQuantity(productsQuantity) {
        return productsQuantity.filter((product) => product.quantity !== 0);
    }

    const removeAllProducts = (product) => {
        let updatedProducts = products.map((item) => {
            if (item.item.id === product.id) {
                item.quantity = 0;
            }

            return item;
        })

        setProducts(checkZeroQuantity(updatedProducts));
    }


    return (
        <CartContext.Provider value={{
            products,
            sendProductsInCart,
            addProduct,
            removeProduct,
            removeAllProducts
        }}>
            {children}
        </CartContext.Provider>
    )
}