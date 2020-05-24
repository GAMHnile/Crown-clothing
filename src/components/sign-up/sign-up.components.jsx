import React, {useState} from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import './sign-up.styles.scss';

import {connect} from 'react-redux';

import {signUpStart} from '../../redux/user/user.actions';

const SignUp=({signUpStart})=>{
    const [userCredentials, setCredentials] = useState({
        displayName: '',
        email: '',
        password:'',
        confirmPassword: ''
    })

    const {displayName,email,password,confirmPassword}=userCredentials;

    const handleChange=event=>{
        const {name, value}=event.target;
        setCredentials({...userCredentials,[name]: value});
    }

    const handleSubmit= event=>{
        event.preventDefault();
        
        if(password!==confirmPassword){
            alert('Passwords do not match')
            return
        }

        signUpStart({email, password, displayName})
    }

    
    return (
        <div className='sign-up'>
            <h2 className='title'>I dont have an account</h2>
            <span>Sign up with email and password</span>


        
        <form className='sign-up-form' onSubmit={handleSubmit}>
        
            <FormInput 
            name='displayName' 
            type='text' 
            label='Display name'
            value={displayName} 
            onChange={handleChange} 
            required />

            <FormInput 
            name='email' 
            type='email' 
            label='Email'
            value={email} 
            onChange={handleChange} 
            required/>

            <FormInput 
            name='password' 
            type='password' 
            label='Password'
            value={password} 
            onChange={handleChange} 
            required/>

            <FormInput 
            name='confirmPassword' 
            type='password' 
            label='Confirm password'
            value={confirmPassword} 
            onChange={handleChange} 
            required/>

            <CustomButton type='submit'>Signup</CustomButton>
        </form>
        </div>




    )
}



const mapDispatchToProps = dispatch =>({
    signUpStart: emailPasswordAndDisplayName=>dispatch(signUpStart(emailPasswordAndDisplayName))
})

export default connect(null, mapDispatchToProps)(SignUp);