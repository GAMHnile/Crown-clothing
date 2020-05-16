import React from 'react';
import './shop.styles.scss';
import CollectionOverview from '../../components/collection-overview/collection-overview.component';
import CollectionPage from '../collection/collection.component';

import {Route} from 'react-router-dom';

import {connect} from 'react-redux';
import {updateCollections} from '../../redux/shop/shop.actions';

import {firestore,convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils';


class ShopPage extends React.Component{
    unsubscribeFromSnapshot = null;
   
    componentDidMount(){
        const {updateCollections}= this.props
        const collectionsRef = firestore.collection('collections');
        this.unsubscribeFromSnapshot = collectionsRef.onSnapshot(async snapshot=>{
            const collection = convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collection);    
        })
    }
    render(){
        const {match}=this.props;
        return(
            <div className='shop-page'>
                <Route exact path={match.path} component={CollectionOverview} /> 
                <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch =>({
    updateCollections: collectionsMap=>dispatch(updateCollections(collectionsMap))
})



export default connect(null, mapDispatchToProps)(ShopPage);