import React, { useState } from 'react';
import QuantityComponent from './QuantityComponent';

export default function Suggestion({ suggestion, addToOrder }) {
    const [quantity, setQuantity] = useState(1);
    return (
        <div >
            <ul>
                <li><img src={suggestion.img} /></li>
                <li>{suggestion.name}</li>
                <li>{suggestion.description}</li>
                <li>{suggestion.gender}</li>
                <li>Price: {suggestion.price} €</li>
            </ul>
            <QuantityComponent quantity={quantity} setQuantity={setQuantity}/>
            <button onClick={() => addToOrder(suggestion._id, quantity)} className='add-to-order-button'>Add to order</button>
        </div>
    );
};
