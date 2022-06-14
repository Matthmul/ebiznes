import '../componentsStyles/ProductList.scss';
import * as React from 'react';
import { useContext } from "react";
import { ProductListContext } from "../context/productListContext";
import Product from "./Product"

function ProductList() {
    const { productList } = useContext(ProductListContext)

    return (
        <div>
            {productList.map((product) => (
                <Product key={product.id} product={product} />
            ))}
        </div>
    );
}

export default ProductList;