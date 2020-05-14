import React from 'react'
import BurgerIngredients from './BurgerIngredients/BurgerIngredients'
import classes from './Burger.module.css'

const burger = (props) => {

  let transformedData = Object.keys(props.ingredients).map(igKey =>{
    return [...Array(props.ingredients[igKey])].map((_,i)=>{
      return <BurgerIngredients key={igKey + i} type={igKey} />
    })
  }).reduce((arr,el)=>{
    return arr.concat(el)
  },[])

  if(transformedData.length === 0)
  transformedData = <p>Please start adding</p>

  return (
    <div className={classes.Burger}>
      <BurgerIngredients type='bread-top' />
      {transformedData}
      <BurgerIngredients type='bread-bottom' />
    </div>
  )
}

export default burger
