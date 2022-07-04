import '../componentsStyles/FinalizeOrder.scss';
import * as React from 'react';
import { useContext } from "react";
import { CartContext } from "../context/cartContext";
import Typography from '@mui/material/Typography';
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const FinalizeOrder = () => {
    const { products } = useContext(CartContext)
    let navigate = useNavigate();

    return (
        <div className="final-payment">
            <Typography variant="h4" className='tittle'>
                Złożno zamówienie:
            </Typography>
            {products.map((product) => (
                <div key={product.item.id} className="single-item-ordered">
                    <Typography variant="h6" className="col">
                        {product.item.description} x {product.quantity}
                    </Typography>
                </div>
            ))}
            <Button className='back'
                onClick={() => navigate("/")}>
                Powrót na główną stronę
            </Button>
        </div>
    )
}

export default FinalizeOrder