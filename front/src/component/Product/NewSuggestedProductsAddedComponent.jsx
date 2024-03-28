import React from 'react'

export default function NewSuggestedProductsAddedComponent({ productAddedList, isAddToOrderClicked }) {

    return (
        <>
            <div>
                {isAddToOrderClicked && <h2 className='suggested-products-h2'>New products added</h2>}
                <div className='suggested-products-list'>
                    {productAddedList.map((orderedProduct, index) => (
                        <div key={index}>
                            <ul>
                                <li><img src={orderedProduct.img} alt={`Product ${orderedProduct._id}`} /></li>
                                <li>{orderedProduct.name}</li>
                                <li>{orderedProduct.description}</li>
                                <li>{orderedProduct.gender}</li>
                                <li>Quantity: {orderedProduct.quantity}</li>
                            </ul>
                        </div>
                    ))} 
                </div>
            </div>
        </>
    );
};