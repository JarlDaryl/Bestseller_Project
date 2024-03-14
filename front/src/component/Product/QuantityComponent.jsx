import React from 'react'
import { useState } from 'react';

export default function QuantityComponent() {
  const [quantity, setQuantity] = useState(1);

  return (
    <div>
      <input className='quantity-input'
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
    </div>
  )
}
