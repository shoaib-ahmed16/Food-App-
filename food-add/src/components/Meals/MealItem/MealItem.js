import React from "react";
import classes from './MealItem.module.css'

const MealItems =props =>{
  const price =`$${props.itemPrice.toFixed(2)}`;
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.itemName}</h3>
        <div className={classes.description}>{props.itemDescription}</div>
        <div className={classes.price}>{price}</div>
      </div>
    </li>
  )
}

export default MealItems;