
import React from "react";
import classes from './Cart.module.css';
import Modal from "../UI/Modal";
const Cart =props=>{
  const cartItems =<ul>{[{id:"c1",name:"sushi",amount:2,price:12.99}].map((item)=><li>{item.name}</li>)}</ul>;
  return<Modal onClose={props.onClose}>
    {cartItems}
    <div>Total Amount</div>
    <span>35.62</span>
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
      <button className={classes.button}>Order</button>
    </div>
  </ Modal>
}

export default Cart;