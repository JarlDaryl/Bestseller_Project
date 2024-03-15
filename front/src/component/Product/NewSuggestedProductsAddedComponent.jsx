import React from 'react'
import QuantityComponent from './QuantityComponent'

export default function NewSuggestedProductsAddedComponent({ productAddedList, setQuantity, quantity, handleQuantityChange}) {

    return (
        <>
            <div className='suggested-products-container'>
                <h2 className='suggested-products-h2'>New products added</h2>
                <div className='suggested-products-list'>
                    {productAddedList.map((orderedProduct, index) => (
                        <div key={index}>
                            <ul>
                                <li><img src={orderedProduct.img} alt={`Product ${orderedProduct._id}`} /></li>
                                <li>{orderedProduct.name}</li>
                                <li>{orderedProduct.description}</li>
                                <li>{orderedProduct.gender}</li>
                                <li>Quantity:<QuantityComponent quantity={orderedProduct.quantity} /></li>
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};