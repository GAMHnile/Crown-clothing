import {takeLatest, call, all, put} from 'redux-saga/effects';
import userActionTypes from './user.types'
import {
    signInSuccess,
    signInFailure,
    signOutSuccess,
    signOutFailure,
    signUpFailure,
    signUpSuccess
    } from './user.actions';

import {
    auth,
    googleProvider,
    createUserProfileDocument,
    getCurrentUser
} from '../../firebase/firebase.utils';

function* createNewUser({payload:{email, password, displayName}}){
   try{
       const {user} = yield auth.createUserWithEmailAndPassword(email, password);
       yield getSnaphotFromUserAuth(user, {displayName});
       yield put(signUpSuccess())
       

   }catch(error){
       yield put(signUpFailure(error));
   }

}

function* signOut(){
    try{
        yield auth.signOut();
        yield put(signOutSuccess());
    }catch(error){
        yield put(signOutFailure(error))
    }

}

function* getSnaphotFromUserAuth(user, additionalData){
    try{
    const userRef=yield call(createUserProfileDocument, user, additionalData);
    const userSnapshot =yield userRef.get();

    const userData = {id: userRef.id, ...userSnapshot.data()};

    yield put(signInSuccess(userData));

    } catch (error) {
        yield put(signInFailure(error));
    }

}

function* signInWithGoogle(){
    try {
        const userAuth =yield auth.signInWithPopup(googleProvider);
        const {user} = userAuth;
        yield call(getSnaphotFromUserAuth, user);

    } catch (error) {
        yield put(signInFailure(error));
    }

}

function* signInWithEmail({payload:{email, password}}){
    try {
        const userAuth =yield auth.signInWithEmailAndPassword(email, password);
        const {user} = userAuth;
        yield call(getSnaphotFromUserAuth, user);
        
    } catch (error) {
        yield put(signInFailure(error));
    }

}

function* isUserAuthenticated(){
    try {
        const userAuth =yield getCurrentUser();
        if(!userAuth) return;
        yield call(getSnaphotFromUserAuth, userAuth);        
    } catch (error) {
        yield put(signInFailure(error));
    }

}


function* googleSignInStart(){
    yield takeLatest(userActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

function* emailSignInStart(){
    yield takeLatest(userActionTypes.EMAIL_SIGN_IN_START, signInWithEmail )
}

function* onCheckUserSession(){
    yield takeLatest(userActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

function* signOutStart(){
    yield takeLatest(userActionTypes.SIGN_OUT_START, signOut);
}

function* onSignUpStart(){
    yield takeLatest(userActionTypes.SIGN_UP_START, createNewUser)
}


function* userSagas(){
    yield all([
        call(googleSignInStart),
        call(emailSignInStart),
        call(onCheckUserSession),
        call(signOutStart),
        call(onSignUpStart)
    ])
}

export default userSagas;