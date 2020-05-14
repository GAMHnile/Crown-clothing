import React from 'react';
import {ReactComponent as Logo} from '../../assets/crown.svg';

import {HeaderContainer, 
        LogoContainer, 
        OptionsContainer, 
        OptionLink} from './header.styles';

import {auth} from '../../firebase/firebase.utils';
import {connect} from 'react-redux';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import {selectCartHidden} from '../../redux/cart/cart.selectors';
import {selectCurrentUser} from '../../redux/user/user.selectors';
import {createStructuredSelector} from 'reselect';

const Header=({currentUser, hidden})=>(
    <HeaderContainer>
        <LogoContainer to='/'>
            <Logo/>
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to='/shop'>Shop</OptionLink>
            <OptionLink to='/shop'>Contact</OptionLink>
            {currentUser?
            <OptionLink as='div' onClick={()=>{auth.signOut()}}>Sign out</OptionLink>
            :<OptionLink to='/signin'>Sign in</OptionLink>}
            <CartIcon />
        </OptionsContainer>
        {hidden? null: (<CartDropdown />)}
    
    </HeaderContainer>

)

const mapStateToProps= createStructuredSelector({
    currentUser: selectCurrentUser , 
    hidden: selectCartHidden
})



export default connect(mapStateToProps)(Header);