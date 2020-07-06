import {all,call, takeLatest, put} from 'redux-saga/effects';
import {clearCart} from './cart.actions';
import userActionTypes from '../user/user.types';
import cartActionTypes from './cart.types';

import {updateCartOnFireStore} from '../../firebase/firebase.utils';

function* clearCartOnSignOut(){
    yield put(clearCart());
}

function* saveUserCart({payload:{userId, userCart}}){
    //userId, userCart
    yield call(updateCartOnFireStore, userId, userCart);
}


function* onSignOutSuccessfull(){
    yield takeLatest(userActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

function* saveUserCartStart(){
    yield takeLatest(cartActionTypes.SAVE_USER_CART, saveUserCart);
}


export default function* cartSagas(){
    yield all([
        call(onSignOutSuccessfull),
        call(saveUserCartStart)
    ])
}