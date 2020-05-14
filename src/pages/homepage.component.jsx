import React from 'react';
import DirectoryMenu from '../components/directory/directory.component';
import {HomePageContainer} from './homepage.styles'


const HomePage =()=>{
    return(
        <HomePageContainer >
            <DirectoryMenu /> 
        </HomePageContainer>

    )
}


export default HomePage;