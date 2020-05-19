import shopActionTypes from './shop.types';
import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils';

export const fetchCollectionsStart = ()=>({
    type: shopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccess = collections=>({
    type: shopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collections
});

export const fetchCollectionsFailure = errorMessage=>({
    type: shopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
});

export const fetchCollectionsStartAsync=()=>{
    return dispatch =>{
        dispatch(fetchCollectionsStart());
        const collectionsRef = firestore.collection('collections');
        collectionsRef.get().then(async snapshot=>{
            const collection = convertCollectionsSnapshotToMap(snapshot);
            dispatch(fetchCollectionsSuccess(collection));    
        }).catch(error=> dispatch(fetchCollectionsFailure(error.message)))
    }
}