import React, { useState, useEffect } from 'react';
import { getSuggestedProductsFromDatabase } from './../../api/ProductsAPIFetch';
import NewSuggestedProductsAddedComponent from './NewSuggestedProductsAddedComponent';

export default function GenerateProductSuggestionComponent({ productId }) {
    console.log('productId:', productId)
    const [suggestions, setSuggestions] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState([]);

    const addToOrder = (productId) => {
        const selectedProduct = suggestions.find(product => product._id === productId);
        setOrder(prevOrder => [...prevOrder, selectedProduct]);
        console.log(`Product ${productId} added to order`);
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
                    <h2>You may also like</h2>
                    {suggestions.map((suggestion, index) => (
                        <div key={index}>
                            <li><img src={suggestion.img} /></li>
                            <p>{suggestion.name}</p>
                            <p>{suggestion.description}</p>
                            <p>{suggestion.gender}</p>
                            <p>Price: {suggestion.price}</p>
                            <button onClick={() => addToOrder(suggestion._id)}>Add to Order</button>
                        </div>
                    ))}
                    <NewSuggestedProductsAddedComponent order={order} />
                </>
            )}
        </div>
    );
};