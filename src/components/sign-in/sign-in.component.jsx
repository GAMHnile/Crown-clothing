import React from 'react';
import './sign-in.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import {connect} from 'react-redux';
import {googleSignInStart, emailSignInStart} from '../../redux/user/user.actions'

class SignIn extends React.Component{
    constructor(props){
        super(props);
        this.state = 
            {email: '',
            password: ''}
    }

    handleSubmit= event=>{
        event.preventDefault();
        const {emailSignInStart} =this.props
        const {email, password}=this.state;
        
        emailSignInStart({email, password});

        this.setState({email: '', password: ''})


    }

    handleChange=event=>{
        const {name, value}=event.target;
        this.setState({[name]: value})

    }



    render(){
        const {googleSignInStart} = this.props;
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
                    <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn >Sign in with Google</CustomButton>
                                    
                </div>
                </form>
        
            </div>



        )
    }





}

const mapDispatchToProps = dispatch =>({
    googleSignInStart: ()=>dispatch(googleSignInStart()),
    emailSignInStart: emailAndPassword=>dispatch(emailSignInStart(emailAndPassword))
})

export default connect(null, mapDispatchToProps)(SignIn);