import '../componentsStyles/ProductList.scss';
import * as React from 'react';
import { useContext } from "react";
import { ProductListContext } from "../context/productListContext";
import Product from "./Product"

function ProductsList() {
    const { productsList } = useContext(ProductListContext)

    return (
        <div>
            {productsList.map((product) => (
                <Product key={product.id} product={product} />
            ))}
        </div>
    );
}

export default ProductsList;