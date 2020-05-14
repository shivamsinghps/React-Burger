import React,{Fragment} from 'react'
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {

  const ingredientSummary = Object.keys(props.ingredients)
                                       .map(igKey=>{
                                        return <li key={igKey} ><span style={{textTransform:'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}</li>})

  return (
        <Fragment>
            <h3>Your Order</h3>
            <p>Your Delicious Burger with following:</p>
            <ul>
              {ingredientSummary}
            </ul>
            <p><strong>{props.price.toFixed(2)}</strong>  <em>Rupees</em></p>
            <Button btnType='Danger' clicked={props.cancel}>Cancel</Button>
            <Button btnType='Success'
            clicked={props.continue}>Continue</Button>
        </Fragment>
  )
}

export default orderSummary
