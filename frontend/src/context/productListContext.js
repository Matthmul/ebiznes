import { useState, createContext, useEffect } from "react";
import { productsHook } from "../hooks/productListHook";
import { salesHook } from "../hooks/saleHook";

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
                setProductsListWithSale(productsListData)
            })
        }
        else {
            productsHook.fetchProductsByCategory(selectedCategory).then((productsListData) => {
                setProductsListWithSale(productsListData)
            })
        }
    }, [selectedCategory])

    function setProductsListWithSale(productsListData) {
        salesHook.fetchSales().then((saleData) => {
            const saleMap = saleData.reduce((map, item) =>
                map.set(item.itemId, item.discount), new Map);
            const result = productsListData.map((item) => (Object.assign({
                discount: saleMap.get(item.id)
            }, item)));
            setProductsList(result)
        })
    }

    return (
        <ProductListContext.Provider value={{
            productList,
            setSelectedCategory,
        }}>
            {children}
        </ProductListContext.Provider>
    )
}