import React, { useState, useEffect } from 'react';
import { getUserOrdersFromDatabase, updateOrderInDatabase } from '@/api/OrdersAPIFetch';
import { fetchProducts } from '@/api/ProductsAPIFetch';
import { getAuthToken } from '@/api/LoginAPIFetch';

export default function GenerateProductSuggestionComponent({ userId }) {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const addToOrder = async (productId) => {
        try {
            const order = orders[0];
            const updatedOrder = { ...order, products: [productId] };
            await updateOrderInDatabase(updatedOrder);
            setOrders([updatedOrder]);
        } catch (error) {
            console.error('Failed to add product to order:', error);
            setError(error.message);
        }
    };

    useEffect(() => {
        if (!userId) {
            setError('User ID is not provided');
            setLoading(false);
            return;
        }
        const fetchOrdersAndProducts = async () => {
            try {
                const userOrders = await getUserOrdersFromDatabase(userId);
                setOrders(userOrders);
                const authToken = await getAuthToken('email', 'password');
                const productsData = await fetchProducts(userId, authToken);
                setProducts(productsData);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch orders or products:', error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchOrdersAndProducts();
    }, [userId]);

    useEffect(() => {
        const generateProductSuggestions = (products, orders) => {
            const orderedProducts = new Set();
            for (const order of orders) {
                for (const product of order.products) {
                    orderedProducts.add(product.id);
                }
            }

            const suggestions = products.filter(product => !orderedProducts.has(product.id));
            return suggestions;
        };

        const newSuggestions = generateProductSuggestions(products, orders);
        setSuggestions(newSuggestions);
    }, [products, orders]);

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <h2>Suggestions</h2>
            {suggestions.map((suggestion, index) => (
                <div key={index}>
                    <p>{suggestion.name}</p>
                    <button onClick={() => addToOrder(suggestion.id)}>Add to Order</button>
                </div>
            ))}
        </div>
    );
};