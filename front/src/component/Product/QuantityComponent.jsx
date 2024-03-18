import React, { useState, useEffect } from 'react';

export default function QuantityComponent({ quantity: propQuantity, setQuantity: propSetQuantity}) {
  
  const [quantity, setQuantity] = useState(propQuantity);

  useEffect(() => {
    setQuantity(propQuantity);
  }, [propQuantity]);

  const handleChange = (e) => {
    setQuantity(e.target.value);
    propSetQuantity(e.target.value);
  };

  return (
    <div>
      <input className='quantity-input'
        type="number"
        min="1"
        value={quantity}
        onChange={handleChange}
      />
    </div>
  );
}
