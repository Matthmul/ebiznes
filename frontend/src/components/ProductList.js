import '../componentsStyles/ProductList.scss';
import * as React from 'react';
import { useContext } from "react";
import { ProductListContext } from "../context/productListContext";
import Product from "./Product"
import Typography from '@mui/material/Typography';

function ProductList() {
    const { productList } = useContext(ProductListContext)

    return (
        <div className='products'>
            <Typography variant="h3" className='tittle'>Dostępne produty do zakupu</Typography>
            <div className='list'>
                {productList.map((product) => (
                    <Product key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}

export default ProductList;