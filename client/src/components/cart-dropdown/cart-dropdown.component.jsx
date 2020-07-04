import React, {useRef} from 'react';
import './cart-dropdown.styles.scss';
import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import {toggleCartHidden} from '../../redux/cart/cart.actions'

import useOutsideAlerter from '../outside-alerter/useOutsideAlerter';


const CartDropdown =({cartItems, history, dispatch, hideCart, iconRef})=>{
    const wrapperRef = useRef(null);

    useOutsideAlerter(wrapperRef, hideCart, iconRef);
    
    
    return(
    
    <div className='cart-dropdown' ref={wrapperRef}>
        <div className='cart-items'>
        {cartItems.length?
            cartItems.map(cartItem=>(<CartItem key={cartItem.id} item={cartItem} />))
            :
            <span className='empty-message'>Your cart is empty</span>
        }
        </div>
        <CustomButton onClick={
            ()=>{history.push('/checkout');
            dispatch(toggleCartHidden())}
        }>GO TO CHECKOUT</CustomButton>
    </div>
    
)}


export default CartDropdown;