import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Cart.css";
import { useCart } from "./useCart"; // Ensure this path is correct
import { useOrders } from "./useOrders";
import { useGlobalContext } from './contexts/GlobalContext';


function Cart() {
    const { cart, updateCartInFirebase, isLoading, error } = useCart(); // Destructure isLoading and error states
    const { user } = useGlobalContext();
    const {addOrder} = useOrders();
    const navigate = useNavigate();
    const [address, setAddress] = useState("");

    // Calculate the total amount directly from the cart state
    const totalAmount = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

    const deleteProduct = (productId) => {
        const updatedCart = cart.filter(item => item.productId !== productId);
        updateCartInFirebase(updatedCart); // Update the cart in Firebase and local state
    };

    const checkout = async (event) => {
        event.preventDefault();
        if (cart && cart.length > 0) {
            const orderDetails = {
                userId: user.id,
                items: cart,
                totalPrice: totalAmount,
                address: address,
                status: "Processing",
            };
            await addOrder(orderDetails); // Create a new order in Firebase
            await updateCartInFirebase([]); // Clear the cart
            navigate("/past-orders");
            alert("Order placed successfully!");
        }
    };


    if (isLoading) return <div className="is-loading">Loading cart...</div>;
    if (error) return <div className="is-error">Error: {error}</div>;

    return (
        <div className="main-cart">
            <Link to="/past-orders" className="view-past-orders-link">View your past orders</Link>

            <div className="cart-items">
                <h1>Your Current Cart</h1>
                {cart.length > 0 ? (
                    cart.map((item, index) => (
                        <div className="product-item" key={index}>
                            <h3>{item.name}</h3>
                            <p>${item.price}</p>
                            <button onClick={() => deleteProduct(item.productId)}>Delete</button>
                        </div>
                    ))
                ) : (
                    <p>Your cart is empty.</p>
                )}
            </div>

            <div className="product-summary">
                <h2>Product Summary</h2>
                {cart.map((item, index) => (
                    <div key={index} className="product-summary-item">
                        <p>{item.name} - ${item.price} x {item.quantity || 1}</p>
                    </div>
                ))}
                <p className="total-amount">Total: ${totalAmount}</p>
                <form onSubmit={checkout}>
                    <input type="text" placeholder="Type Your name" required />
                    <input
                        type="text" 
                        placeholder="Enter Your Address" 
                        value={address} 
                        onChange={e => setAddress(e.target.value)} 
                        required 
                    />
                    <button type="submit" className="checkOut">Checkout</button>
                </form>
            </div>
        </div>
    );
}

export default Cart;
