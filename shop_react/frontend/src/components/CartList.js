import '../componentsStyles/Cart.scss';
import * as React from 'react';
import { useContext } from "react";
import { CartContext } from "../context/cartContext";
import {Link} from "react-router-dom";

function CartList() {
    const { products, addProduct, removeProduct, removeAllProducts } = useContext(CartContext)

    const itemsPrice = products.reduce((a, c) => a + c.quantity * c.item.price, 0);

    return (
        <div className="basket">
            <h2>Podsumowanie:</h2>
            <aside className="block">
                <div>
                    {products.length === 0 && <div>Koszyk jest pusty</div>}
                    {products.map((item) => (
                        <div key={item.item.id} className="single-item-wrap">
                            <div className="single-item">
                                <div className="col-left">{item.item.description}</div>
                                <div className="col-right">
                                    <button onClick={() => removeProduct(item.item)} className="remove">
                                        -
                                    </button>
                                    <button onClick={() => addProduct(item.item)} className="add">
                                        +
                                    </button>
                                    <button onClick={() => removeAllProducts(item.item)}>
                                        usuń
                                    </button>
                                </div>
                            </div>
                            <div className="text-bottom">
                                {item.quantity} x {item.item.price} PLN
                            </div>
                        </div>
                    ))}
                    {products.length !== 0 && (
                        <>
                            <p>Podsumowanie {itemsPrice} PLN</p>
                            <Link
                                disabled={!products.length}
                                to="/payment">
                                Przejdź do zamówienia
                            </Link>
                        </>
                    )}
                </div>
            </aside>
        </div>
    )
}

export default CartList