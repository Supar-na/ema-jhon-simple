import React, { useEffect, useState } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import orderImage from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';

const Review = () => {
    const [cart ,setCart]  = useState([]);
    const [orderPlaced , setOrderPlaced] = useState(false);
    const history = useHistory();

    const handleProccedCheckout = () =>{
        history.push('/shipment');
    //    setCart([]);
    //    setOrderPlaced(true); 
    //    processOrder();
    }
    
    const removeProduct = (productKey) => {
        
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        fetch('http://shrouded-springs-49883.herokuapp.com/prouctsByKeys',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setCart(data))
       
    },[])

    let thankYou;
    if(orderPlaced){
        thankYou = <img src={orderImage} alt=""/>
    }

    return (
        <div className ="same-container">
            <div className ="product-container">
                {
                    cart.map(pd => <ReviewItem 
                        removeProduct = {removeProduct}
                        key = {pd.key}
                        product = {pd}
                    ></ReviewItem>)
                }

                {
                thankYou
                }
            </div>
            <div className ="cart-container">
                <Cart  cart={cart}>
                    <button onClick = {handleProccedCheckout} className="btn-cart">Procced Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;