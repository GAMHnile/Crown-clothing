import React from 'react';
import './collection-item.styles.scss';
import CustomButton from '../custom-button/custom-button.component';

import {connect} from 'react-redux';

import {createStructuredSelector} from 'reselect';
import {selectCartItems} from '../../redux/cart/cart.selectors';
import {selectCurrentUser} from '../../redux/user/user.selectors';

import {addItem} from '../../redux/cart/cart.actions';
import {saveUserCart} from'../../redux/cart/cart.actions';

const CollectionItem=( {item,addItem, saveCart, currentUser, allCartItems})=>{
    const {name, imageUrl, price}=item;
    return(
    <div className='collection-item'>
        <div className='image' style={{backgroundImage: `url(${imageUrl})`}} />
        <div className='collection-footer'>
            <span className='name'>{name}</span>
            <span className='price'>{price}</span>
        </div>
        <CustomButton className='custom-button' 
        onClick={()=>{
            addItem(item);
            saveCart({userId: currentUser.id, userCart: allCartItems});
        }} 
        inverted>Add to cart</CustomButton>
    
    </div>
)}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    allCartItems: selectCartItems
})

const mapDispatchToProps=(dispatch)=>({
    addItem: item=>dispatch(addItem(item)),
    saveCart: (userIdAndCart)=>dispatch(saveUserCart(userIdAndCart))
})

export default connect(mapStateToProps, mapDispatchToProps)(CollectionItem);