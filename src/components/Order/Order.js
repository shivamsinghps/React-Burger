import React from 'react'
import classes from './Order.module.css'
const order = (props)=> {
  const ingredients =[]
  for(let ingkey in props.ingredients)
  {
    ingredients.push({name:ingkey,quantity:props.ingredients[ingkey]})
  }

  const ingrediens_output= ingredients.map(ingredient =>(
    <span key={ingredient.name} className={classes.Ingredients}>{ingredient.name} : {ingredient.quantity} </span>
  ))

  const orderdata =[]
  for(let ingkey in props.orderData)
  {
    orderdata.push({name:ingkey,value:props.orderData[ingkey]})
  }

  const orders_output= orderdata.map(odata =>(
    <span key={odata.name} className={classes.Ingredients}>{odata.name} : {odata.value} </span>
  ))
console.log(orderdata);
  return (
    <div className={classes.Order}>
    <p><strong>Ingredients</strong> <em>{ingrediens_output}</em> </p>
    <p><strong>price</strong> <em>{parseFloat(props.price).toFixed(2)}</em></p>
    <p><strong>Details</strong> <em>{orders_output}</em> </p>
    </div>
  )
}

export default order
