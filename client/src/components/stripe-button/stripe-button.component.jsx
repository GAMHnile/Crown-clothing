import React from 'react';
import axios from 'axios';

import StripeCheckout from 'react-stripe-checkout';




const StripeButton=({price})=>{
    const priceForStripe=price*100;
    const publishableKey='pk_test_4el31DLPwZHg2etaj1TAMUJV00f1WQtVSE'

    const onToken=(token)=>{
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            }
        }).then(response=>{
            alert('Payment succesful');
        })
        .catch(error=>{
            console.log('payment error: ', JSON.parse(error) );
            alert('There was an issue with your payment. Please ensure you use the test card provided')
        })
    }

    return(
    <StripeCheckout 
    label='Pay Now'
    name='CRWN Clothing ltd'
    billingAddress
    shippingAddress
    image='https://sendeyo.com/up/d/f3eb2117da'
    description={`Your total is $${price}`}
    amount={priceForStripe}
    panelLabel='Pay Now'
    token={onToken}
    stripeKey={publishableKey}
    />
)}

export default StripeButton;