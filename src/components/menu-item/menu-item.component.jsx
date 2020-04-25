import React from 'react';
import './menu-item.styles.scss';
import {withRouter} from 'react-router-dom'

const MenuItem =({title, imageUrl, size,url, history, match})=>{
    return (
        <div className={`menu-item ${size}`} onClick={()=>history.push(`${match.url}${url}`)} >
            <div className='background-image' 
            style={{backgroundImage: `url(${imageUrl})`}} />
    
                    <div className='content'>
                        <h1 className='title'>{title.toUpperCase()}</h1>
                        <span className='subtitle'>Shop now</span>
                    </div>
        </div>

)
}




export default withRouter(MenuItem);