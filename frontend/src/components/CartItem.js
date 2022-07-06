import '../componentsStyles/CartItem.scss';
import * as React from 'react';
import { useContext } from "react";
import { CartContext } from "../context/cartContext";
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { IconButton } from "@mui/material";

const CartItem = ({ product }) => {
    const { addProduct, removeProduct, removeAllProducts } = useContext(CartContext)

    return (
        <div key={product.item.id} className="single-item-wrap">
            <div className="single-item">
                <Typography variant="h6" className="col-left">{product.item.description}</Typography>
                <ButtonGroup variant="contained" aria-label="outlined primary button group" className="col-right">
                    <IconButton color="primary" onClick={() => removeProduct(product.item)} className="remove">
                        <RemoveIcon />
                    </IconButton>
                    <IconButton color="primary" onClick={() => addProduct(product.item)} className="add">
                        <AddIcon />
                    </IconButton>
                    <IconButton color="primary" onClick={() => removeAllProducts(product.item)} className="clean">
                        usuń
                    </IconButton>
                </ButtonGroup>
            </div>
            <Typography className="single-item-bottom">
                {product.quantity} x {(product.item.discount ? product.item.discount : product.item.price)} PLN
            </Typography>
        </div>
    )
}

export default CartItem