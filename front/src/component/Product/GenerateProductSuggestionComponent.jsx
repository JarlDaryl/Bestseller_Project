import React, { useState, useEffect } from 'react';
import { getSuggestedProductsFromDatabase } from './../../api/ProductsAPIFetch';

export default function GenerateProductSuggestionComponent({productId}) {
    console.log('productId:', productId)
    const [suggestions, setSuggestions] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const addToOrder = (id) => {
        // Implement your addToOrder function here
        console.log(`Product ${id} added to order`);
    };

    useEffect(() => {
        getSuggestedProductsFromDatabase(productId)
            .then(suggestedProducts => {
                if (suggestedProducts && suggestedProducts.length > 0) {
                    setSuggestions(suggestedProducts);
                } else {
                    setError('No suggested products found.');
                }
                setLoading(false);
            })
            .catch(error => {
                setError(`Error en GenerateComponent. Error: ${error.message}`);
                setLoading(false);
            });
    }, [productId]);
    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && (
                <>
                    <h2>Suggestions</h2>
                    {suggestions.map((suggestion, index) => (
                        <div key={index}>
                            <p>Product Name: {suggestion.name}</p>
                            <p>Product Price: {suggestion.price}</p>
                            <p>Product Category: {suggestion.category}</p>
                            <p>Product ID: {suggestion._id}</p>
                            <button onClick={() => addToOrder(suggestion.id)}>Add to Order</button>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};