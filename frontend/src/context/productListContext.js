import { useState, createContext, useEffect } from "react";
import { productsHook } from "../hooks/productListHook";

export const ProductListContext = createContext({
    productList: [],
    setSelectedCategory: () => {
        // Intentional empty
    },
});

export const ProductListContextProvider = ({ children }) => {
    const [productList, setProductsList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(-1);

    useEffect(() => {
        if (selectedCategory === -1) {
            productsHook.fetchProducts().then((productsListData) => {
                setProductsList(productsListData)
            })
        }
        else {
            productsHook.fetchProductsByCategory(selectedCategory).then((productsListData) => {
                setProductsList(productsListData)
            })
        }
    }, [selectedCategory])

    return (
        <ProductListContext.Provider value={{
            productList,
            setSelectedCategory,
        }}>
            {children}
        </ProductListContext.Provider>
    )
}