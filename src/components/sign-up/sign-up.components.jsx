import React from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import './sign-up.styles.scss';

import {connect} from 'react-redux';

import {signUpStart} from '../../redux/user/user.actions';

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

    handleSubmit= event=>{
        event.preventDefault();
        const {displayName,email,password,confirmPassword}=this.state
        if(password!==confirmPassword){
            alert('Passwords do not match')
            return
        }
        const {signUpStart} = this.props;

        signUpStart({email, password, displayName})
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

const mapDispatchToProps = dispatch =>({
    signUpStart: emailPasswordAndDisplayName=>dispatch(signUpStart(emailPasswordAndDisplayName))
})

export default connect(null, mapDispatchToProps)(SignUp);