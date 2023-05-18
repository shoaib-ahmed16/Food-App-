
import React,{useContext,useState} from "react";
import Modal from "../UI/Modal";
import classes from './Cart.module.css';
import CartContext from "../../store/cart-context";
import CartItem from './CartItem'
import Checkout from './Checkout'

const Cart =props=>{
  const [isCheckout,setIsCheckout] =useState(false);
  const [isSubmitted,setIsSubmitted] =useState(false);
  const [didSubmit,setDidSubmit]=useState(false);
  const cartCtx =useContext(CartContext);

  const totalAmount =`$${cartCtx.totalAmount.toFixed(2)}`

  const hasItems =cartCtx.items.length>0;

  const cardItemRemoveHandler =(id)=>{
    cartCtx.removeItem(id);
  }

  const cardItemAddHandler =(item)=>{
    cartCtx.addItem({...item,amount:1})
  }
  
  const orderHandler =()=>{
    setIsCheckout(true);
  }
  const submitOrderHandler= async (userData)=>{
    setIsSubmitted(true)
   let response =await  fetch('https://react-backend-ba397-default-rtdb.firebaseio.com/order.json',{
      method:'POST',
      body:JSON.stringify({
        user:userData,
        urderedItems:cartCtx.items
      })
    })
    let resposeReturn = await response.json();
    setIsSubmitted(false)
    setDidSubmit(true);
    cartCtx.clearCart();
  }

  const cartItems =<ul className={classes['cart-items']}>{cartCtx.items.map((item)=><CartItem key={item.id}
     name={item.name} amount={item.amount} price={item.price} onRemove={cardItemRemoveHandler.bind(null,item.id)} onAdd={cardItemAddHandler.bind(null,item)}/>)}</ul>;

  const modalActions =<div className={classes.actions}>
    <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
    {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
  </div>

  const cartModalContent =<React.Fragment>
  {cartItems}
    <div className={classes.total}>
    <span>Total Amount</span>
    <span>{totalAmount}</span>
    </div>
    {isCheckout &&<Checkout onSubmit={submitOrderHandler} onCancel={props.onClose}/>}
    {!isCheckout && modalActions}
  </React.Fragment>

  const isSubmittingModalContent =<p>Sending Order data...</p>
  const didSubmitModalContent =<>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>Close</button>
  </div></>
 


  return<Modal onClose={props.onClose}>
    {!isSubmitted && !didSubmit && cartModalContent}
    {isSubmitted && isSubmittingModalContent}
    {didSubmit && didSubmitModalContent}
  </ Modal>
}

export default Cart;