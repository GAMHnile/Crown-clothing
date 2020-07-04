import React from 'react';

import {ErrorImageContainer, ErrorImageOverlay, ErrorImageText} from './error-boundary.styles';


class ErrorBoundary extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            hasErrored: false
        }
    }

    static getDerivedStateFromError(error){
        //do something with error
        return {hasErrored: true}
    }

    componentDidCatch(error, info){
        console.log({error, info});
    }

    render(){
        if(this.state.hasErrored){
            return (
                <ErrorImageOverlay>
                    <ErrorImageContainer imageUrl="https://i.imgur.com/A040Lxr.png" />
                    <ErrorImageText >Sorry the page broke</ErrorImageText>
                </ErrorImageOverlay>
            )
        }

        return this.props.children
    }
    
}

export default ErrorBoundary