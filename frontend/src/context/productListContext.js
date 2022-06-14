import { useState, createContext, useEffect } from "react";
import { productsHook } from "../hooks/productListHook";

export const ProductListContext = createContext({
    productList: [],
});

export const ProductListContextProvider = ({ children }) => {
    const [productList, setProductsList] = useState([]);

    useEffect(() => {
        productsHook.fetchProducts().then((productsListData) => setProductsList(productsListData));
    }, [])

    return (
        <ProductListContext.Provider value={{
            productList,
        }}>
            {children}
        </ProductListContext.Provider>
    )
}