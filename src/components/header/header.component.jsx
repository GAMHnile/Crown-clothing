import React from 'react';
import {ReactComponent as Logo} from '../../assets/crown.svg';

import {HeaderContainer, 
        LogoContainer, 
        OptionsContainer, 
        OptionLink} from './header.styles';

import {connect} from 'react-redux';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdownContainer from '../cart-dropdown/cart-dropdown.container';

import {signOutStart} from '../../redux/user/user.actions';

import {selectCartHidden} from '../../redux/cart/cart.selectors';
import {selectCurrentUser} from '../../redux/user/user.selectors';
import {createStructuredSelector} from 'reselect';

const Header=({currentUser, hidden, signOut})=>(
    <HeaderContainer>
        <LogoContainer to='/'>
            <Logo/>
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to='/shop'>Shop</OptionLink>
            <OptionLink to='/shop'>Contact</OptionLink>
            {currentUser?
            <OptionLink as='div' onClick={signOut}>Sign out</OptionLink>
            :<OptionLink to='/signin'>Sign in</OptionLink>}
            <CartIcon />
        </OptionsContainer>
        {hidden? null: (<CartDropdownContainer />)}
    
    </HeaderContainer>

)

const mapStateToProps= createStructuredSelector({
    currentUser: selectCurrentUser , 
    hidden: selectCartHidden
})

const mapDispatchToProps = dispatch =>({
    signOut: ()=>dispatch(signOutStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);