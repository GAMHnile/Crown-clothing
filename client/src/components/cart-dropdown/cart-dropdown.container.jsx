import {connect} from 'react-redux';
import {compose} from 'redux';
import {withRouter} from 'react-router-dom';

import {selectCartItems} from '../../redux/cart/cart.selectors';
import {createStructuredSelector} from 'reselect';

import {setCartHidden} from '../../redux/cart/cart.actions';

import CartDropdown from './cart-dropdown.component';

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
});

const mapDispatchToProps = dispatch=>({
    hideCart: ()=>dispatch(setCartHidden()),
    dispatch
});

const CartDropdownContainer = compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(CartDropdown)

export default CartDropdownContainer;