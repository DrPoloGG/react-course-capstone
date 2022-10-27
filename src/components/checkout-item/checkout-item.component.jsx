import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import './checkout-item.styles.scss';

const CheckoutItem = ({ product }) => {
    const { name, imageUrl, price, quantity } = product;
    const { addItemToCart, removeItemFromCart, clearItem } = useContext(CartContext);

    const addToItemHandler = () => addItemToCart(product);
    const removeFromItemHandler = () => removeItemFromCart(product);
    const clearItemHandler = () => clearItem(product);

    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={ imageUrl } alt={ `${name}`}/>
            </div>
            <span className='name'>{ name }</span>
            <span className='quantity'>
                <div className='arrow' onClick={ removeFromItemHandler }>&#10094;</div>
                <span className='value'>{ quantity }</span>
                <div className='arrow' onClick={ addToItemHandler }>&#10095;</div>
            </span>
            <span className='price'>${ price }</span>
            <div className='remove-button' onClick={ clearItemHandler } >&#10005;</div>
        </div>
    );
}

export default CheckoutItem;