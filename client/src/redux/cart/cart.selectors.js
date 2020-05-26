import {createSelector} from 'reselect';

const selectCart = state => state.cart;

export const selectCartItems = createSelector([selectCart], cart=> cart.cartItems);

export const selectCartItemsCount = createSelector([selectCartItems], cartItems=>{
    return cartItems.reduce((accumulatedItems, item)=>accumulatedItems+item.quantity ,0)});

export const selectCartHidden= createSelector([selectCart], cart=> cart.hidden);

export const selectTotal= createSelector([selectCartItems], cartItems=>{
    return cartItems.reduce((accumulatedItemsPrice, item)=>accumulatedItemsPrice+(item.quantity*item.price ),0)});