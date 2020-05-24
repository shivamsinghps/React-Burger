import React from 'react'
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'

const buildControls = (props)=> {
  const controls =[
    {label:'Salad' ,type:'salad'},
    {label:'Bacon' ,type:'bacon'},
    {label:'Cheese' ,type:'cheese'},
    {label:'Meat' ,type:'meat'}
  ]

  return (
    <div className={classes.BuildControls}>
    <p><strong>{props.price.toFixed(2)}</strong>  <em>Rupees</em></p>
      {controls.map(control=><BuildControl key={control.label} label={control.label}
       add_ing={()=>props.add_ing(control.type)} del_ing={ ()=> props.del_ing(control.type)} disabled={props.disabled[control.type]} />)}
    <button
      className={classes.OrderButton}
      disabled={!props.purchasable}
      onClick={props.ordered}>
      {props.isAuth? 'ORDER NOW':'SIGNUP TO ORDER'}
    </button>
    </div>
  )
}

export default buildControls
