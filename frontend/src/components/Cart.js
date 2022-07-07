import '../componentsStyles/Cart.scss';
import * as React from 'react';
import { useContext } from "react";
import { CartContext } from "../context/cartContext";
import Typography from '@mui/material/Typography';
import CartItem from './CartItem';
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Cart(props) {
    const { products } = useContext(CartContext)
    const itemsPrice = products.reduce((a, c) => a + c.quantity * (c.item.discount ? c.item.discount : c.item.price), 0);
    let navigate = useNavigate();

    return (
        <div className="cart">
            <Typography variant="h4" className='tittle'>Podsumowanie:</Typography>
            <aside className="summary">
                {products.length === 0 &&
                    <Typography variant="h5" className='tittle'>Koszyk jest pusty</Typography>}
                {products.map((product) => (
                    <CartItem key={product.item.id} product={product} />
                ))}
                {products.length !== 0 && (
                    <>
                        <Typography variant="h6" className='summary'>Razem: {itemsPrice} PLN</Typography>
                        <Button className='pay'
                            disabled={!products.length}
                            onClick={() => props.isLoggedIn ? navigate("/payment") : navigate("/loginOrGuest")}>
                            Przejdź do płatności
                        </Button>
                    </>
                )}
            </aside>
        </div>
    )
}

export default Cart