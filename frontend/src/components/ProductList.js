import '../componentsStyles/ProductList.scss';
import * as React from 'react';
import { useContext } from "react";
import { ProductListContext } from "../context/productListContext";
import Product from "./Product"
import Typography from '@mui/material/Typography';
import Category from './Category';

function ProductList() {
    const { productList, setSelectedCategory } = useContext(ProductListContext)

    return (
        <div className='products'>
            <Category setCategory={setSelectedCategory} />
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