import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { FaCartPlus, FaShoppingCart } from 'react-icons/fa';

function Nav({cartVisibility, setCartVisibility}) {
  function isCartVisible(e) {
    e.preventDefault();
    cartVisibility ? setCartVisibility(false)
    : setCartVisibility(true);
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link className="navbar-logo" to="/">
          <FaShoppingCart className="navbar-icon" />
          WebbShop
        </Link>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link className="navbar-link" to="/products">Products</Link>
          </li>
          <li className="navbar-item">
            <Link className="navbar-link" to="/admin/manageproducts">Admin</Link>
          </li>
          <li className="navbar-item" onClick={isCartVisible}>
            <FaCartPlus className='navbar-small-icon'/>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Nav
