import React, {useState} from 'react';
import './sign-in.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import {connect} from 'react-redux';
import {googleSignInStart, emailSignInStart} from '../../redux/user/user.actions'

import {createStructuredSelector} from 'reselect';
import {selectCartItems} from '../../redux/cart/cart.selectors';

const SignIn=({emailSignInStart, googleSignInStart, userCart})=>{
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
                <CustomButton className="mtop--small" type='button' onClick={()=>googleSignInStart({userCart})} isGoogleSignIn >Sign in with Google</CustomButton>
                                
            </div>
            </form>
    
        </div>



    )
}

const mapStateToProps = createStructuredSelector({
    userCart: selectCartItems
})


const mapDispatchToProps = dispatch =>({
    googleSignInStart: userCart=>dispatch(googleSignInStart(userCart)),
    emailSignInStart: emailAndPassword=>dispatch(emailSignInStart(emailAndPassword))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);