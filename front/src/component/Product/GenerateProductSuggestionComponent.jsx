import React, { useState, useEffect } from 'react';
import { getSuggestedProductsFromDatabase } from './../../api/ProductsAPIFetch';
import NewSuggestedProductsAddedComponent from './NewSuggestedProductsAddedComponent';
import Suggestion from './Suggestion';

export default function GenerateProductSuggestionComponent({ productId, productQuantity, productPrice, setTotal, total }) {
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
        if (!selectedProduct) {
            console.error(`Product ${productId} not found`);
            return;
        }

        const productInOrder = order.find(product => product._id === productId);
        if (productInOrder) {
            console.log(`Product ${productId} is already in the order`);
            setTotalPrice(prevTotal => prevTotal + selectedProduct.price * quantity);
            return
        }
        if (productAddedList.length == 0) {
            setTotalPrice(prevTotal => total - productQuantity * productPrice);
            console.log("entra en el if");
        }

        const selectedProductWithQuantity = { ...selectedProduct, quantity };
        setProductAddedList([...productAddedList, selectedProductWithQuantity])

        const productsToAdd = Array(quantity).fill(selectedProduct);
        setOrder(prevOrder => [...prevOrder, ...productsToAdd]);
        setTotalPrice(prevTotal => prevTotal + selectedProduct.price * quantity);
        console.log(`Product ${productId} added to order ${quantity} times`);
    };

    useEffect(() => {
        setTotal(totalPrice.toFixed(2))
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
        <div className='generate-products-suggestion-container'>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && (
                <>
                    <h2 className='products-generated-h2'>You may also like</h2>
                    <div className='products-generated-list'>
                        {suggestions.map((suggestion, index) => (
                            <Suggestion key={index} suggestion={suggestion} addToOrder={addToOrder} />
                        ))}
                    </div>
                    <NewSuggestedProductsAddedComponent productAddedList={productAddedList} quantity={quantity} />
                </>
            )}
        </div>
    );
};
