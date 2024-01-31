import React from 'react';
import Card from './Card';
import classes from './Card.module.css';
import { useProducts } from './useProducts';
import { useCart } from './useCart';

function Shop() {
  const { products,isLoading, error } = useProducts(); // Use the custom useProducts hook for fetching products
  const { cart, updateCartInFirebase } = useCart(); // Use the custom useCart hook for cart operations

  const handleAddToCart = async (product) => {
    // Check if the product is already in the cart
    const existingProductIndex = cart.findIndex((item) => item.productId === product.id);

    let updatedCart;
    if (existingProductIndex >= 0) {
      // If the product is already in the cart, update the quantity
      updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += 1;
    } else {
      // If the product is not in the cart, add it with quantity 1
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    // Update the cart in Firebase and local state
    await updateCartInFirebase(updatedCart);

    alert("Product added to cart");
  };
  if (isLoading) {
    return <div className="is-loading">Loading products...</div>; // Display a loading indicator while products are being fetched
  }

  if (error) {
    return <div className="is-error">Error: {error}</div>; // Display an error message if an error occurred
  }

  const productDisplay = products.map((product) => (
    <React.Fragment key={product.id}>
      <h1>{product.name}</h1>
      <Card className={classes.card}>
        <img src={product.imageURL} alt={product.name} />
        <p>${product.price}</p>
        <p>{product.description}</p>
        <button onClick={() => handleAddToCart(product)}>Add To Cart</button>
      </Card>
    </React.Fragment>
  ));

  return (
    <div className="products">
      <h1>Enjoy Your Shopping</h1>
      {productDisplay}
    </div>
  );
}

export default Shop;
