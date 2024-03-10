import React from 'react'

export default function NewSuggestedProductsAddedComponent({ order, quantity }) {

    return (
        <>
            <h2>New products added</h2>
            {order.map((orderedProduct, index) => (
                <div key={index}>
                    <li><img src={orderedProduct.img} alt={`Product ${orderedProduct._id}`} /></li>
                    <p>{orderedProduct.name}</p>
                    <p>{orderedProduct.description}</p>
                    <p>{orderedProduct.gender}</p>
                    <p>Quantity: {quantity}</p>
                </div>
            ))}

        </>
    );
};