import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee ,faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import './Product.css';
import { Link } from 'react-router-dom';


const Product = (props) => {
    const {img,name,seller,price,stock,key} = props.product;
    return (
        <div className="single-product">
            <div>
             <img src={img} alt="" />
            </div>

            <div>
            <h3 className="product-name"><Link to ={"/product/"+key}>{name}</Link></h3>
            <p>by : {seller}</p>
            <p>${price}</p>
            <br />
            <p>Only {stock} left in stock - Order Soon</p>
            {props.showAddToCart &&<button onClick = {() => props.handleAddProduct(props.product)}
             className="btn-cart"><FontAwesomeIcon icon={faShoppingCart} />Add to cart</button>}
            </div>  
        </div>
    );
};

export default Product;