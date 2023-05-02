import React, { useState } from 'react'
import Nav from './Nav'
import Cart from './Cart'

const Header = (props) => {
    const [cartVisibility, setCartVisibility] = useState(false);
    
  return (
    <div>
      <Nav cartVisibility={cartVisibility} setCartVisibility={setCartVisibility}/>
      {cartVisibility ? <Cart 
      cartList={props.cartList} 
      setCartList={props.setCartList}/>
    : null}
      
    </div>
  )
}

export default Header
