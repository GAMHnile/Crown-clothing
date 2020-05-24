import React, {useState} from 'react';
import './sign-in.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import {connect} from 'react-redux';
import {googleSignInStart, emailSignInStart} from '../../redux/user/user.actions'

const SignIn=({emailSignInStart, googleSignInStart})=>{
    const [userCredentials, setUserCredentials] = useState({email: '', password: ''})

    const {email, password}=userCredentials;
    
    const handleSubmit= event=>{
        event.preventDefault();
        emailSignInStart({email, password});

        setUserCredentials({email: '', password: ''})


    }

    const handleChange=event=>{
        const {name, value}=event.target;
        setUserCredentials({...userCredentials,[name]: value})

    }

    return(
        <div className='sign-in'>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>


            <form onSubmit={handleSubmit}>
                
                <FormInput name='email' type='email' label='email' 
                onChange={handleChange}
                value={email} required />
                
                
                <FormInput name='password' type='password' label='password'
                onChange={handleChange}
                value={password} required/>
            <div className='buttons'>
                <CustomButton type='submit'  >Sign in</CustomButton>
                <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn >Sign in with Google</CustomButton>
                                
            </div>
            </form>
    
        </div>



    )
}




const mapDispatchToProps = dispatch =>({
    googleSignInStart: ()=>dispatch(googleSignInStart()),
    emailSignInStart: emailAndPassword=>dispatch(emailSignInStart(emailAndPassword))
})

export default connect(null, mapDispatchToProps)(SignIn);