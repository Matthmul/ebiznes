import * as React from 'react';
import { useContext } from "react";
import { Link } from 'react-router-dom';
import { CartContext } from "../context/cartContext";

const FinalizeOrder = () => {
    const { products } = useContext(CartContext)

    return (
        <div className="container">
            Złożno zamówienie:
            {products.map((item) => (
                <div key={item.item.id} className="single-item-wrap">
                    <div className="single-item">
                        <div className="col-left">{item.item.description}</div>
                    </div>
                    <div className="text-bottom">
                        {item.quantity} x {item.item.price} PLN
                    </div>
                </div>
            ))}
            <Link to="/">Powrót na główną stronę</Link>
        </div>
    )
}

export default FinalizeOrder