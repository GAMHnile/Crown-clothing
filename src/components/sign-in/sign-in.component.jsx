import React from 'react';
import './sign-in.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import {auth, signInWithGoogle} from '../../firebase/firebase.utils';

class SignIn extends React.Component{
    constructor(props){
        super(props);
        this.state = 
            {email: '',
            password: ''}
    }

    handleSubmit=async event=>{
        event.preventDefault();
        const {email, password}=this.state;
        try {
            await auth.signInWithEmailAndPassword(email, password);
            
        } catch (error) {
            console.log(error)
        }

        this.setState({email: '', password: ''})


    }

    handleChange=event=>{
        const {name, value}=event.target;
        this.setState({[name]: value})

    }



    render(){
        return(
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>


                <form onSubmit={this.handleSubmit}>
                    
                    <FormInput name='email' type='email' label='email' 
                    onChange={this.handleChange}
                    value={this.state.email} required />
                    
                    
                    <FormInput name='password' type='password' label='password'
                    onChange={this.handleChange}
                    value={this.state.password} required/>
                <div className='buttons'>
                    <CustomButton type='submit'  >Sign in</CustomButton>
                    <CustomButton type='submit' onClick={signInWithGoogle} isGoogleSignIn >Sign in with Google</CustomButton>
                                    
                </div>
                </form>
        
            </div>



        )
    }





}

export default SignIn;