import '../componentsStyles/Product.scss';
import { CartContext } from "../context/cartContext";
import { ProductListContext } from "../context/productListContext";
import { useContext } from "react";
import { IconButton } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Typography from '@mui/material/Typography';

const Product = ({ product }) => {
    const { addProduct } = useContext(CartContext)
    const { saleList } = useContext(ProductListContext)

    return (
        <div className="product">
            <Typography variant="h4" className='description'>{product.description}</Typography>
            {
                product.discount ?
                    <div className='price'>
                        <Typography variant="h8" className='old-price'>{product.price} zł </Typography>
                        <Typography variant="h6" className='new-price'>{product.discount} zł</Typography>
                    </div>
                    :
                    <Typography variant="h6" className='price'>{product.price} zł</Typography>
            }
            <div className='button'>
                <IconButton color="primary" variant="contained" aria-label="Add to shopping cart"
                    className='add-button'
                    onClick={() => addProduct(product)}>
                    <ShoppingCartIcon />
                    Dodaj do koszyka
                </IconButton>
            </div>
        </div>
    )
}

export default Product