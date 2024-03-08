import React, { useState, useEffect } from 'react';
import { updateOrderInDatabase } from '@/api/OrdersAPIFetch';

export default function GenerateProductSuggestionComponent() {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    let userId;

    useEffect(() => {
        const user = window.sessionStorage.getItem('user');
        if (user) {
            console.log(user)
            const userObj = JSON.parse(user);
            userId = userObj.data.id;
            console.log(userId)
        }
    }, []);

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
        const fetchProductSuggestions = async (categoryId) => {
            try {
                const response = await suggestProductChanges({ categoryId }); // Assuming you pass the categoryId in the request body
                const similarProducts = response.data;

                const orderedProducts = new Set();
                for (const order of orders) {
                    for (const product of order.products) {
                        orderedProducts.add(product.id);
                    }
                }

                const suggestions = similarProducts.filter(product => !orderedProducts.has(product.id));
                setSuggestions(suggestions);
            } catch (error) {
                console.error('Failed to fetch product suggestions:', error);
                setError(error.message);
            }
        };

        const filteredProducts = products.filter(product => product.category === 'CATEGORY_NAME');
        const categoryId = filteredProducts.length > 0 ? filteredProducts[0].category : null;

        if (categoryId) {
            fetchProductSuggestions(categoryId);
        } else {
            setSuggestions([]);
        }
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