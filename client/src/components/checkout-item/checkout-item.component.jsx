import React from 'react';
import './checkout-item.styles.scss';

import {connect} from 'react-redux';
import {
    clearItemFromCart, 
    addItem, 
    removeItem, 
    saveUserCart} 
    from '../../redux/cart/cart.actions';

import {createStructuredSelector} from 'reselect';
import {selectCartItems} from '../../redux/cart/cart.selectors';
import {selectCurrentUser} from '../../redux/user/user.selectors'; 

const CheckoutItem=({cartItem, clearItem, addItem, removeItem, saveCart, currentUser, allCartItems})=>{
    const {name, quantity, imageUrl, price}= cartItem
    return (<div className='checkout-item'>
        <div className='image-container'>
            <img src={imageUrl} alt='item' />
        </div>
        <span className='name'>{name}</span>
        <span className='quantity'>
            <div className='arrow' 
            onClick={()=>{
                removeItem(cartItem);
                saveCart({userId: currentUser.id, userCart: allCartItems});
            }}
            >&#10094;</div>
                <span className='value'>{quantity}</span>
            <div className='arrow' 
            onClick={()=>{
                addItem(cartItem);
                saveCart({userId: currentUser.id, userCart: allCartItems});
            }}
            >&#10095;</div>
        </span>
        <span className='price'>${price}</span>
        <div className='remove-button' 
        onClick={()=>{
            clearItem(cartItem);
            saveCart({userId: currentUser.id, userCart: allCartItems});
        }}
        >&#10005;</div>
    </div>
)}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    allCartItems: selectCartItems
})

const mapDispatchToProps=dispatch=>({
    clearItem: item=>dispatch(clearItemFromCart(item)),
    addItem: item=>dispatch(addItem(item)),
    removeItem: item=>dispatch(removeItem(item)),
    saveCart: (userIdAndCart)=>dispatch(saveUserCart(userIdAndCart))
})


export default connect(mapStateToProps, mapDispatchToProps)(CheckoutItem);