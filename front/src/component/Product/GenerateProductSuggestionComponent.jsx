import React, { useState, useEffect } from 'react';
import { getSuggestedProductsFromDatabase } from './../../api/ProductsAPIFetch';
import NewSuggestedProductsAddedComponent from './NewSuggestedProductsAddedComponent';

export default function GenerateProductSuggestionComponent({ productId, setTotal, total }) {
    console.log('productId:', productId)
    const [suggestions, setSuggestions] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    const [productAddedList, setProductAddedList] = useState([])

    const addToOrder = (productId, quantity) => {
        const selectedProduct = suggestions.find(product => product._id === productId);
        const productInOrder = order.find(product => product._id === productId);

        if (productInOrder) {
            console.log(`Product ${productId} is already in the order`);
            setTotalPrice(prevTotal => prevTotal + selectedProduct.price * quantity);
            return
        }
        setProductAddedList([...productAddedList, selectedProduct])

        const productsToAdd = Array(quantity).fill(selectedProduct);
        setOrder(prevOrder => [...prevOrder, ...productsToAdd]);
        setTotalPrice(prevTotal => prevTotal + selectedProduct.price * quantity);
        console.log(`Product ${productId} added to order ${quantity} times`);
        
    };

    useEffect(() => {
        setTotal(totalPrice)
    }, [totalPrice]);

    useEffect(() => {
        console.log(productAddedList)
    }, [productAddedList]);

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
                            <input
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                            <button onClick={() => addToOrder(suggestion._id, quantity)}>Add to Order</button>
                        </div>
                    ))}
                    <NewSuggestedProductsAddedComponent productAddedList={productAddedList} quantity={quantity} />
                    {order.length > 0 && <p>Total Price: {totalPrice.toFixed(2)}</p>}
                </>
            )}
        </div>
    );
};
