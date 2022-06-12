import '../componentsStyles/Product.scss';
import { CartContext } from "../context/cartContext";
import { useContext } from "react";

const Product = ({ product }) => {
    const { products, addProduct } = useContext(CartContext)

    return (
        <div className="products">
            <h2>{product.description}</h2>
            <p>{`${product.price} zł`}</p>
            <div className='product-buttons'>
                <button className="btn" onClick={() => addProduct(product)}>Dodaj do koszyka</button>
            </div>
        </div>
    )
}

export default Product