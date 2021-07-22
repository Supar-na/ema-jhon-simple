import React from 'react';

const ReviewItem = (props) => {
    const {name,quantity,key,price} = props.product; 
    const reviewItemStyle ={
        borderBottom :'2px solid lightgray',
        margin:'0 100px 10px',
        paddingBottom: '8px'
    }
    return (
        <div style ={reviewItemStyle}>
           <h3 className="product-name">{name}</h3>
            <h4>Quantity : {quantity}</h4>
            <p>Price : ${price}</p>
            <button onClick = {()=> props.removeProduct(key)} className="btn-cart">Remove</button>
        </div>
    );
};

export default ReviewItem;