import React from 'react'
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function NewSuggestedProductsAddedComponent({ productAddedList, isAddToOrderClicked }) {

    return (
        <>
            <div>
                {isAddToOrderClicked &&
                    <h2 className='suggested-products-header'>New products added</h2>}
                <div className='suggested-products-list'>
                    {productAddedList.map((orderedProduct, index) => (
                        <div key={index}>
                            <ul>
                                <li><img src={orderedProduct.img} alt={`Product ${orderedProduct._id}`} /></li>
                                <li className='suggested-product-name'>{orderedProduct.name}</li>
                                <li>{orderedProduct.description}</li>
                                <li>Gender: {orderedProduct.gender}</li>
                                <li className='suggested-products-quantity'>Quantity: {orderedProduct.quantity}</li>
                                <li>Price: {orderedProduct.price} €</li>
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

        </>
    );
};