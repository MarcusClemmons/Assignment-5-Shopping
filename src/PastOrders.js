import React from 'react';
import './PastOrders.css';
import { useOrders } from './useOrders';

function PastOrders() {
  const { orders, isLoading, error } = useOrders();

  if (isLoading) return <div className="is-loading">Loading past orders...</div>;
  if (error) return <div className="is-error">Error: {error}</div>;

  return (
    <div className="past-orders-page">
      <h1>Your Past Orders</h1>
      {orders.length > 0 ? (
        orders.map((order, index) => (
          <div key={index} className="past-order-item">
            <h3>{order.items.map(item => `Product Name: ${item.name}`).join(", ")}</h3>
            <p>Total Price: ${order.totalPrice}</p>
            <p>Address: {order.address}</p>
            <p>Status: {order.status}</p>
          </div>
        ))
      ) : (
        <p>You have no past orders.</p>
      )}
    </div>
  );
}

export default PastOrders;
