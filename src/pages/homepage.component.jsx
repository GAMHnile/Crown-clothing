import React from 'react';
import './homepage.styles.scss';
import DirectoryMenu from '../components/directory/directory.component';


const HomePage =()=>{
    return(
        <div className='homepage'>
            <DirectoryMenu /> 
        </div>

    )
}


export default HomePage;