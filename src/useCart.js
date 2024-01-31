import { useState, useEffect, useCallback } from 'react';
import { useGlobalContext } from './contexts/GlobalContext';

export const useCart = () => {
    const [cart, setCart] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useGlobalContext();

    const fetchCartData = useCallback(async () => {
        if (user) {
            setIsLoading(true);
            const cartUrl = `https://assignment-5-shopping-default-rtdb.firebaseio.com/users/${user.id}/cart.json?auth=${user.token}`;
            try {
                const response = await fetch(cartUrl);
                if (!response.ok) {
                    throw new Error('Failed to fetch cart data.');
                }
                const data = await response.json();
                // Check if data is an object before converting it to an array
                const loadedCart = data && typeof data === 'object' ? Object.values(data) : [];
                setCart(loadedCart);
            } catch (error) {
                setError('Failed to load cart: ' + error.message);
            } finally {
                setIsLoading(false);
            }
        }
    }, [user]);

    const updateCartInFirebase = useCallback(async (updatedCart) => {
        if (user) {
            setIsLoading(true);
            const cartUrl = `https://assignment-5-shopping-default-rtdb.firebaseio.com/users/${user.id}/cart.json?auth=${user.token}`;
            try {
                await fetch(cartUrl, {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(updatedCart),
                });
                setCart(updatedCart);
            } catch (error) {
                setError('Failed to update cart: ' + error.message);
            } finally {
                setIsLoading(false);
            }
        }
    }, [user]);

    useEffect(() => {
        fetchCartData();
    }, [fetchCartData]);

    return { cart, updateCartInFirebase, isLoading, error };
};
