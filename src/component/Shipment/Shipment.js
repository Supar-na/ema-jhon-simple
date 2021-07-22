import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { userContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';

const Shipment = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
      const savedCart = getDatabaseCart();
      const orderDetails = {...loggedInUser, products:savedCart,shipment:data,orderTime:new Date()}

      fetch('http://shrouded-springs-49883.herokuapp.com/addOrder',{
        method:'POST',
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify(orderDetails)
      })
      .then(res => res.json())
      .then(data => {
        if(data){
          alert('Order Placed Successfully');
          processOrder()
        }
      })
    };
    const [loggedInUser,setLoggedInUser] = useContext(userContext)
  
    console.log(watch("example")); // watch input value by passing the name of it
  
    return (
      
      <form style={{textAlign:'center',margin:'20px',padding:'15px'}} onSubmit={handleSubmit(onSubmit)}>
        
        <input name="name" placeholder="Your Name" {...register("example")} defaultValue={loggedInUser.name} />
        <br />
        <input name="email" placeholder="Your Email" {...register("exampleRequired", { required: true })} defaultValue={loggedInUser.email}/>
        <br />
        <input name="adress" placeholder="Your Adress" {...register("exampleRequired", { required: true })} />
        <br />
        <input name="contact" placeholder="Your Phone no" {...register("exampleRequired", { required: true })} />
        <br />
        {errors.exampleRequired && <span style={{color:'red'}}>This field is required</span>}
        <br />
        <input type="submit" />
      </form>
    );
};

export default Shipment;
