import cartActionTypes from './cart.types';
import {addItemToCart, removeItem, mergeOnlineCart} from './cart.utils';

const INITIAL_STATE = {
    hidden: true,
    cartItems: []
}
 
const cartReducer = (state = INITIAL_STATE, action)=>{
    switch (action.type){
        case cartActionTypes.TOGGLE_CART_HIDDEN:
            return {...state, hidden: !state.hidden};
        case cartActionTypes.SET_CART_HIDDEN:
            return {...state, hidden: true};
        case cartActionTypes.SET_USER_CART:
            return {...state, cartItems: mergeOnlineCart(action.payload, state.cartItems)};
        case cartActionTypes.ADD_ITEM:
            return{...state, cartItems: addItemToCart(state.cartItems, action.payload) };
        case cartActionTypes.CLEAR_ITEM_FROM_CART:
            return {...state, cartItems: state.cartItems.filter(item=> item.id!==action.payload.id)};
        case cartActionTypes.REMOVE_ITEM:
            return {...state, cartItems: removeItem(state.cartItems, action.payload) };
        case cartActionTypes.CLEAR_CART:
            return {...state, cartItems: []};
        default:
            return state;
    }
}

export default cartReducer;