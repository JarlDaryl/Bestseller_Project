import React, { useState } from 'react';
import QuantityComponent from './QuantityComponent';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

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
            <QuantityComponent quantity={quantity} setQuantity={setQuantity} />
            <Stack direction="row" spacing={1}>
                <Chip
                    label="Add to order"
                    onClick={() => addToOrder(suggestion._id, quantity)}
                    addToOrderIcon={<ShoppingCartIcon />}
                />
            </Stack>        </div>
    );
};
