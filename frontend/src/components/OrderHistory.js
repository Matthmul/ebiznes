import '../componentsStyles/OrderHistory.scss';
import * as React from 'react';
import { useState, useEffect } from "react";
import { cartHook } from "../hooks/cartHook";
import { useCookies } from 'react-cookie';
import Typography from '@mui/material/Typography';

const OrderHistory = () => {
    const [userCartHistory, setUserCartHistory] = useState([]);
    const [cookies] = useCookies(['username']);

    useEffect(() => {
        if (cookies.username)
            cartHook.fetchCartHistoryByUser().then((userCartHistoryData) => {
                setUserCartHistory(userCartHistoryData);
            })
    }, [cookies.username])

    return (
        <div className="order-history">
            {
                userCartHistory
                    ?
                    <>
                        <Typography variant="h4" className='tittle'>
                            Historia zamówień:
                        </Typography>
                        {
                            userCartHistory.map((cart, index) => (
                                <div key={cart.id} className="single-item-ordered">
                                    <Typography key={cart.id + "t"} variant="h6" className="order-num">
                                        Zamówienie nr {index + 1}
                                    </Typography>
                                    {
                                        cart.items.map((item) => (
                                            <Typography key={cart.id + "." + item.item.id} variant="h8" className="order-col">
                                                {item.item.description} x {item.quantity}
                                            </Typography>
                                        ))
                                    }
                                </div>
                            ))
                        }
                    </>
                    :
                    <Typography variant="h4" className='tittle'>
                        Brak zamówień.
                    </Typography>
            }
        </div>
    )
}

export default OrderHistory