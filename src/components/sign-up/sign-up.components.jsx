import React from 'react';
import {auth, createUserProfileDocument} from '../../firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import './sign-up.styles.scss';

class SignUp extends React.Component{
    constructor(){
        super();
        this.state = {
            displayName: '',
            email: '',
            password:'',
            confirmPassword: ''
        }
    }
    handleChange=event=>{
        const {name, value}=event.target;
        this.setState({[name]: value});
    }

    handleSubmit=async event=>{
        event.preventDefault();
        const {displayName,email,password,confirmPassword}=this.state
        if(password!==confirmPassword){
            alert('Passwords do not match')
            return
        }
            try {
                
                const {user}=await auth.createUserWithEmailAndPassword(email, password);
                await createUserProfileDocument(user,{displayName});

                this.setState({
                    displayName: '',
                    email: '',
                    password:'',
                    confirmPassword: ''
                });
        
            } catch (error) {
                console.error(error);
            }
    }

    render(){
        const {displayName,email,password,confirmPassword}=this.state
        return (
            <div className='sign-up'>
                <h2 className='title'>I dont have an account</h2>
                <span>Sign up with email and password</span>


            
            <form className='sign-up-form' onSubmit={this.handleSubmit}>
            
                <FormInput 
                name='displayName' 
                type='text' 
                label='Display name'
                value={displayName} 
                onChange={this.handleChange} 
                required />

                <FormInput 
                name='email' 
                type='email' 
                label='Email'
                value={email} 
                onChange={this.handleChange} 
                required/>

                <FormInput 
                name='password' 
                type='password' 
                label='Password'
                value={password} 
                onChange={this.handleChange} 
                required/>

                <FormInput 
                name='confirmPassword' 
                type='password' 
                label='Confirm password'
                value={confirmPassword} 
                onChange={this.handleChange} 
                required/>

                <CustomButton type='submit'>Signup</CustomButton>
            </form>
            </div>




        )
    }


}

export default SignUp;