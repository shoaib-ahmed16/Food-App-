import React,{useContext,useEffect,useState} from "react";
import classes from './HeaderCartButton.module.css'
import CartIcon from "../Cart/CartIcon";
import CartContext from '../../store/cart-context'
const HeaderCartButton =props =>{

  const [btnIsHilighted,setButIsHilighted]=useState(false);

  const cartCtx=useContext(CartContext);

  const{items} =cartCtx;

  const  numberOfCartItem=cartCtx.items.reduce((currNumber,item)=>{
    return currNumber+ item.amount;
  },0);

  const butClasses =`${classes.button} ${btnIsHilighted ? classes.bump:""}`
   useEffect (()=>{
    if(cartCtx.items.length===0){
      return;
    }
    setButIsHilighted(true);

    const timer =setTimeout(()=>{
      setButIsHilighted(false)
    },300)

    return ()=> clearTimeout(timer)

  },[items]);
  return <button className={butClasses} onClick={props.onClick}>
    <span className={classes.icon}>
      <CartIcon/>
    </span>
    <span>
      Your Cart
    </span>
    <span className={classes.badge}>{numberOfCartItem}</span>
  </button>
}
export default HeaderCartButton;