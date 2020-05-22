import {takeLatest, call, put, all} from 'redux-saga/effects';
import shopActionTypes from './shop.types';
import {fetchCollectionsSuccess,
        fetchCollectionsFailure} from './shop.actions'

import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils';

function* fetchCollectionsAsync(){
    try {
        const collectionsRef =yield firestore.collection('collections');
        const snapshot = yield collectionsRef.get();
        const collectionsMap = yield call(
            convertCollectionsSnapshotToMap, 
            snapshot);
        
        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message))
    }
}

export function* fetchCollectionsStart(){
    yield takeLatest( shopActionTypes.FETCH_COLLECTIONS_START,fetchCollectionsAsync)
}

export default function* shopSagas(){
    yield all([call(fetchCollectionsStart)])
}