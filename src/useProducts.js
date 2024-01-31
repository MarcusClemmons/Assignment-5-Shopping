import { useState, useEffect } from 'react';
import { useGlobalContext } from './contexts/GlobalContext';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setCart, user } = useGlobalContext();

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('https://assignment-5-shopping-default-rtdb.firebaseio.com/products.json');
        if (!response.ok) throw new Error("Failed to fetch products.");
        
        const data = await response.json();
        const loadedProducts = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));

        setProducts(loadedProducts);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
    if (!user) {
      alert("Please log in to add items to your cart.");
      return;
    }

    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      const existingProductIndex = updatedCart.findIndex((item) => item.productId === product.productId);

      if (existingProductIndex >= 0) {
        updatedCart[existingProductIndex].quantity += 1;
      } else {
        updatedCart.push({ ...product, quantity: 1 });
      }

      return updatedCart;
    });

    alert("Product added to cart");
  };

  return { products, handleAddToCart,isLoading, error  };
};
