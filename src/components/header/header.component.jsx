import React from 'react';
import {Link} from 'react-router-dom';
import {ReactComponent as Logo} from '../../assets/crown.svg';
import './header.styles.scss';
import {auth} from '../../firebase/firebase.utils';
import {connect} from 'react-redux';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import {selectCartHidden} from '../../redux/cart/cart.selectors';
import {selectCurrentUser} from '../../redux/user/user.selectors';
import {createStructuredSelector} from 'reselect';

const Header=({currentUser, hidden})=>(
    <div className='header'>
        <Link className='logo-container' to='/'>
            <Logo/>
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'>Shop</Link>
            <Link className='option' to='/shop'>Contact</Link>
            {currentUser?
            <div className='Option' onClick={()=>{auth.signOut()}}>Sign out</div>
            :<Link className='option' to='/signin'>Sign in</Link>}
            <CartIcon />
        </div>
        {hidden? null: (<CartDropdown />)}
    
    </div>

)

const mapStateToProps= createStructuredSelector({
    currentUser: selectCurrentUser , 
    hidden: selectCartHidden
})



export default connect(mapStateToProps)(Header);