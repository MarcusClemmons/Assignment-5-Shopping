import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useGlobalContext } from './contexts/GlobalContext'; // Import useGlobalContext
import { useCart } from './useCart';

function Navbar() {
  const { user, logout } = useGlobalContext(); // Destructure user and logout from context
  const { cart, showReminder } = useCart();

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      {user ? (
        <Link onClick={logout}>Logout</Link> // Add Logout button if user is logged in
      ) : (
        <Link to="/login">Login</Link> // Show Login link if user is not logged in
      )}
      <Link to="/shop">Shop</Link>
      <Link to="/cart">Cart</Link>
      {showReminder && cart.length > 0 && (
        <div className="cart-reminder">
          You have items in your cart. <Link to="/cart">Complete your purchase</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
