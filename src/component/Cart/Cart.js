import React from 'react';

import Product from '../Product/Product';

const Cart = (props) => {
    
    const cart = props.cart;
    
    // const total = cart.reduce( (total, prd) => total+prd.price ,0);
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
       total = total+ product.price * product.quantity || 1; 
    }
    
    let shipping = 0;
    if (total>99.99){
        shipping =0.5;
    }
    else if(total>30){
        shipping = 5.00;
    }
    else if(total>15){
        shipping = 10.5;
    }
    const tax = total* 0.1 ;
    const formatNumber = (num) =>{
        const preciseNum = num.toFixed(2);
        return Number(preciseNum);
    }
    const grandTotal = total + shipping + tax  ;
    return (
        <div>
            <h4 className="text-danger">Order summary</h4>
            <p>Items Ordered :{cart.length}</p>
            <p>Product Price :{formatNumber(total)}</p>
            <p>Shipping Cost : {shipping}</p>
            <p>Tax & Vat : {formatNumber(tax)}</p>
            <p>Total Price :{formatNumber(grandTotal)}</p>
            <br />
            {
                props.children
            }
        </div>
    );
};

export default Cart;