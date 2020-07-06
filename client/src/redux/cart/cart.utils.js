export const addItemToCart = (cartItems, cartItemToAdd)=>{
    const existingCartItem = cartItems.find(cartItem=> cartItem.id === cartItemToAdd.id)

    if(existingCartItem){
        return cartItems.map(cartItem=>{
            return( (cartItem.id === cartItemToAdd.id)?{...cartItem, quantity: cartItem.quantity+ 1}
            :cartItem)
        } )
    }

    return [...cartItems, {...cartItemToAdd, quantity: 1}]
}

export const removeItem=(cartItems, cartItemToRemove)=>{
    const existingCartItem=cartItems.find(cartItem=> cartItem===cartItemToRemove);

    if(existingCartItem.quantity===1){
        return cartItems.filter(cartItem=> cartItem.id !== cartItemToRemove.id);
    }

    return cartItems.map(cartItem=> cartItem.id===cartItemToRemove.id?
        {...cartItem, quantity: cartItem.quantity - 1}
        :
        cartItem )


}

const mergeItemToCart = (cartItems, cartItemToAdd)=>{
    const existingCartItem = cartItems.find(cartItem=> cartItem.id === cartItemToAdd.id)

    if(existingCartItem){
        return cartItems.map(cartItem=>{
            return( (cartItem.id === cartItemToAdd.id)?{...cartItem, quantity: cartItem.quantity+ cartItemToAdd.quantity}
            :cartItem)
        } )
    }

    return [...cartItems, cartItemToAdd]
}


export const mergeOnlineCart = (onlineCart, offlineCart)=>{
    //if online cart is empty return offline cart
    if(!(!!onlineCart.length)) return offlineCart;
    //if items exist in online and offline cart merge carts
    if(!!offlineCart.length && !!onlineCart.length){
        let mergedCart = offlineCart;

        onlineCart.forEach(item=>{
            mergedCart = mergeItemToCart(mergedCart, item)
        })

        return mergedCart
    }else{
        //if nothing in offline cart return onlineCart
        return onlineCart
    }
}