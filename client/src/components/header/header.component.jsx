import React, {useRef} from 'react';
import {ReactComponent as Logo} from '../../assets/crown.svg';

import {HeaderContainer, 
        LogoContainer, 
        OptionsContainer, 
        OptionLink} from './header.styles';

import {connect} from 'react-redux';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdownContainer from '../cart-dropdown/cart-dropdown.container';

import {signOutStart} from '../../redux/user/user.actions';

import {selectCartHidden, selectCartItems} from '../../redux/cart/cart.selectors';
import {selectCurrentUser} from '../../redux/user/user.selectors';
import {createStructuredSelector} from 'reselect';

const Header=({currentUser, hidden, signOut, userCart})=>{
    const iconRef = useRef(null);

    return (
    <HeaderContainer>
        <LogoContainer to='/'>
            <Logo/>
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to='/shop'>Shop</OptionLink>
            <OptionLink to='/shop'>Contact</OptionLink>
            {currentUser?
            <OptionLink as='div' onClick={()=>signOut({userId: currentUser.id, userCart})}>Sign out</OptionLink>
            :<OptionLink to='/signin'>Sign in</OptionLink>
            }
            <CartIcon iconRef={iconRef} />
        </OptionsContainer>
        {hidden? null: (<CartDropdownContainer iconRef={iconRef} />)}
    
    </HeaderContainer>

)}

const mapStateToProps= createStructuredSelector({
    currentUser: selectCurrentUser , 
    hidden: selectCartHidden,
    userCart: selectCartItems
})

const mapDispatchToProps = dispatch =>({
    signOut: userIdAndUserCart=>dispatch(signOutStart(userIdAndUserCart))
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);