import { useState, useEffect } from 'react';
import { useGlobalContext } from './contexts/GlobalContext';

export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useGlobalContext();

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      if (!user) {
        setOrders([]);
        setIsLoading(false);
        return;
      }

      const ordersUrl = `https://assignment-5-shopping-default-rtdb.firebaseio.com/orders.json?auth=${user.token}`;
      try {
        const response = await fetch(ordersUrl);
        if (!response.ok) throw new Error("Failed to fetch orders.");

        const data = await response.json();
        const loadedOrders = Object.keys(data)
          .filter(key => data[key].userId === user.id)
          .map(key => ({
            id: key,
            ...data[key],
          }));

        setOrders(loadedOrders);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const addOrder = async (newOrder) => {
    setIsLoading(true);
    if (!user) {
      setError("User not authenticated");
      setIsLoading(false);
      return;
    }

    const ordersUrl = `https://assignment-5-shopping-default-rtdb.firebaseio.com/orders.json?auth=${user.token}`;
    try {
      const response = await fetch(ordersUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...newOrder, userId: user.id }),
      });

      if (!response.ok) throw new Error('Failed to place the order.');

      const responseData = await response.json();
      setOrders(prevOrders => [...prevOrders, { ...newOrder, id: responseData.name }]);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { orders, addOrder, isLoading, error };
};
