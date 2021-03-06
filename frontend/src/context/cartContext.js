import { useState, createContext, useEffect } from "react";
import { cartHook } from "../hooks/cartHook";
import { useCookies } from 'react-cookie';

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
    const [cookies] = useCookies(['token']);

    useEffect(() => {
        let productsToSet = products
        if (products.length === 0) {
            const savedProducts = localStorage.getItem("products");
            if (savedProducts && JSON.parse(savedProducts).length) {
                productsToSet = checkZeroQuantity(JSON.parse(savedProducts));
                setProducts(productsToSet);
            }
        }
        localStorage.setItem("products", JSON.stringify(productsToSet));
    }, [products]);

    const addProduct = (newProduct) => {
        let productInCart = products.findIndex((product) => product.item.id === newProduct.id);
        if (productInCart !== -1) {
            products[productInCart].quantity = products[productInCart].quantity + 1;
            setProducts([...products])
        } else {
            setProducts([...products, { item: { ...newProduct }, quantity: 1 }])
        }
    }

    const sendProductsInCart = (paymentId, addressId) => {
        if (products.length !== 0)
            cartHook.sendProducts(cookies.token, paymentId, addressId, ...products).then(
                (status) => {
                    console.log(status);
                    products.length = 0
                    localStorage.setItem("products", []);
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
        localStorage.setItem("products", JSON.stringify(checkZeroQuantity(updatedProducts)));
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
        localStorage.setItem("products", JSON.stringify(checkZeroQuantity(updatedProducts)));
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