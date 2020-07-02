import React, {useEffect, lazy, Suspense} from 'react';

import {GlobalStyle} from './global.syles';

import Header from './components/header/header.component.jsx';

import {Route, Switch, Redirect, useLocation} from 'react-router-dom';

import {connect} from 'react-redux';
import {checkUserSession} from './redux/user/user.actions';

import {createStructuredSelector} from 'reselect';
import {selectCurrentUser} from './redux/user/user.selectors';

import Spinner from './components/spinner/spinner.component';

const HomePage = lazy(()=>import('./pages/homepage.component'));
const SignInAndSignUpPage = lazy(()=>import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx'));
const ShopPage = lazy(()=>import('./pages/shop/shop.component'));
const CheckoutPage = lazy(()=>import('./pages/checkout/checkout.component'));


const App=({checkUserSession, currentUser})=> {

  useEffect(()=>{
    checkUserSession()
  },[checkUserSession])

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    }, [pathname]);

  

  return (
    <div className="App">
      <GlobalStyle />
      <Header />
      <Switch>
        <Suspense fallback={<Spinner />}>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />

          <Route 
          exact 
          path='/signin' 
          render={()=>currentUser? <Redirect to='/' /> : <SignInAndSignUpPage />} />
        </Suspense>
      </Switch>
    </div>
  );

}



const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch =>({
  checkUserSession: ()=>dispatch(checkUserSession())
})


export default connect(mapStateToProps, mapDispatchToProps)(App);
