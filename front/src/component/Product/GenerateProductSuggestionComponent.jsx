import React, { useState, useEffect } from 'react';
import { getSuggestedProductsFromDatabase } from './../../api/ProductsAPIFetch';
import NewSuggestedProductsAddedComponent from './NewSuggestedProductsAddedComponent';
import Suggestion from './Suggestion';
import { updateOrderInDatabase } from '@/api/OrdersAPIFetch';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function GenerateProductSuggestionComponent({ productId, setTotal, total, order, existingProductIndex }) {
    const [suggestions, setSuggestions] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newOrder, setNewOrder] = useState(order);
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isAddToOrderClicked, setIsAddToOrderClicked] = useState(false);
    const [productAddedList, setProductAddedList] = useState(order.products);
    console.log(order)

    const addToOrder = async (productId, quantity) => {
        const productIndex = productAddedList.findIndex(product => product.productId._id === productId);
        const product = productAddedList[productIndex];
        const newProduct = {
            productId: productId,
            quantity: quantity
        };
        if (productIndex === -1) {
            productAddedList.push(newProduct);
        } else {
            productAddedList[productIndex].quantity += quantity;
        }
        const newOrder = {
            ...order,
            products: productAddedList,
            _id: order._id 
        };
        setNewOrder(newOrder);
        setProductAddedList(productAddedList); // Add this line
        const updatedOrder = await updateOrderInDatabase(newOrder);
        console.log(updatedOrder);
        setTotalPrice(updatedOrder.total);

        setIsAddToOrderClicked(true);
    };

    useEffect(() => {
        if (totalPrice !== undefined) {
            setTotal(totalPrice.toFixed(2));
        }
    }, [totalPrice]);


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
            {loading && (
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            )}
            {error && (
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert variant="filled" severity="error">
                        Invalid email or password. Please try again</Alert>
                </Stack>
            )}
            {!loading && !error && (
                <>
                    <h2 className='products-generated-h2'>You may also like</h2>
                    <div className='products-generated-list'>
                        {suggestions.map((suggestion, index) => (
                            <Suggestion key={index} suggestion={suggestion} addToOrder={addToOrder} />
                        ))}
                    </div>
                    <NewSuggestedProductsAddedComponent productAddedList={productAddedList} quantity={quantity} isAddToOrderClicked={isAddToOrderClicked} />
                </>
            )}
        </div>
    );
};