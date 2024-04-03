import React, { useState, useEffect } from 'react';
import { getSuggestedProductsFromDatabase } from './../../api/ProductsAPIFetch';
import NewSuggestedProductsAddedComponent from './NewSuggestedProductsAddedComponent';
import Suggestion from './Suggestion';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    height: '70%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function GenerateProductSuggestionComponent({ productId, productQuantity, productPrice, setTotal, total, order }) {
    console.log('productId:', productId)
    const [suggestions, setSuggestions] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    const [productAddedList, setProductAddedList] = useState([])
    const [isAddToOrderClicked, setIsAddToOrderClicked] = useState(false);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleCloseCanceledOrder = () => setOpen(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const addToOrder = (productId, quantity) => {
        const selectedProduct = suggestions.find(product => product._id === productId);
        if (!selectedProduct) {
            console.error(`Product ${productId} not found`);
            return;
        }

        const productInOrder = order.products.find(product => product._id === productId);
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
        setTotalPrice(prevTotal => prevTotal + selectedProduct.price * quantity);
        console.log(`Product ${productId} added to order ${quantity} times`);
        setIsAddToOrderClicked(true);
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

    console.log('order:', order)

    const handleAccept = () => {
        const originalProducts = order.products.map(product => product.productId);
        const allProducts = [...originalProducts, ...productAddedList];
        const viableProducts = allProducts.filter(product => product.viable);

        const updatedOrder = {
            ...order,
            products: viableProducts.map(product => ({ productId: product }))
        };

        console.log('Orden actualizada:', updatedOrder);
    };

    return (
        <>
            {!loading && !error && (
                <div>
                    <Button
                        onClick={handleOpen}
                        className='similar-products-open-button'
                    >Similar products</Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                    >
                        <Box sx={{ ...style, overflowY: 'auto' }}>
                            <Typography variant="h6" component="h2"
                                className='similar-products-header'
                            >Similar products
                            </Typography>
                            <Grid container direction="row" spacing={2}>
                                {suggestions.map((suggestion, index) => (
                                    <Grid key={index} item xs={4}>
                                        <Suggestion
                                            suggestion={suggestion}
                                            addToOrder={addToOrder}
                                            setSnackbarOpen={setSnackbarOpen}
                                            sx={{ fontFamily: 'inherit' }}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                            <br />
                            <Box className='similar-products-buttons-container '>
                                <Button
                                    onClick={handleCloseCanceledOrder}
                                    className='cancel-close-button'
                                ><CancelIcon /></Button>
                                <Button
                                    onClick={() => { handleClose(); handleAccept() }}
                                    className='accept-close-button'
                                > <CheckCircleIcon /></Button>
                            </Box>
                        </Box>
                    </Modal>
                    <Snackbar
                        open={snackbarOpen}
                        autoHideDuration={3000}
                        onClose={() => setSnackbarOpen(false)}
                        style={{ position: 'fixed', bottom: 20, left: 20 }}
                    >
                        <Alert
                            onClose={() => setSnackbarOpen(false)}
                            severity='success'
                            variant='filled'
                            sx={{ width: '100%' }}
                        >
                            Successfully added product to shopping cart!
                        </Alert>
                    </Snackbar>
                    <Grid container direction="row" spacing={2}>
                        <NewSuggestedProductsAddedComponent productAddedList={productAddedList} quantity={quantity} isAddToOrderClicked={isAddToOrderClicked} />
                    </Grid>
                </div>
            )}
        </>
    );
};