import React from 'react';
import fakeData from '../../fakeData';

const Manage = () => {
    const handleAddProduct = () =>{
        fetch('http://shrouded-springs-49883.herokuapp.com/addProducts',{
            method:'POST',
            headers:{
                'content-type':'application/json'  
            },
            body: JSON.stringify(fakeData)
        })
    }
    

    return (
        <div>
            <form action="">
             <p><span>NAME:</span><input type="text" /></p>
             <p><span>PRICE:</span><input type="text" /></p>
             <p><span>QUANTITY:</span><input type="text" /></p>
             <p><span>Product Image</span><input type="file" /></p>   
             <button onClick={handleAddProduct}>Add Product</button>
            </form>
           
        </div>
    );
};

export default Manage;