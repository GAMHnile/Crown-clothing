import React from 'react';

import './collection-overview.styles.scss';

import CollectionPreview from '../../components/preview-collection/collection-preview.component';

import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectCollectionsForPreview} from '../../redux/shop/shop.selectors';

const CollectionOverview=({collections})=>{

    return(
    <div className='collection-overview'>
        {
            collections.map(({id, ...otherCollectionProps})=> (
            <CollectionPreview key={id} {...otherCollectionProps}  />))
        }
    
    </div>
)}

const mapStateToProps=createStructuredSelector({
    collections: selectCollectionsForPreview
})

export default connect(mapStateToProps)(CollectionOverview);