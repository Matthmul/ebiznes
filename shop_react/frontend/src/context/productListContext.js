import { useState, createContext, useEffect } from "react";
import { productsHook } from "../hooks/productListHook";

export const ProductListContext = createContext({
    productsList: [],
});

export const ProductListContextProvider = ({ children }) => {
    const [productsList, setProductsList] = useState([]);

    useEffect(() => {
        productsHook.fetchProducts().then((productsListData) => setProductsList(productsListData));
    }, [])

    return (
        <ProductListContext.Provider value={{
            productsList,
        }}>
            {children}
        </ProductListContext.Provider>
    )
}