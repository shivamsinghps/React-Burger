import React, { Component , Fragment } from 'react'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENTS_PRICE ={
  salad:17,
  cheese:15,
  meat:22,
  bacon:18
}

export default class BurgerBuilder extends Component {
state={
  ingredients:{
    salad:0,
    bacon:0,
    cheese:0,
    meat:0,
  },
  totalPrice: 20,
  purchasable:false,
  purchasing:false,
}

purchaseHandler = () => {
  this.setState({purchasing: true})
}

updatePurchaseState (ingredients) {
        const sum = Object.keys( ingredients )
            .map( igKey => {
                return ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        this.setState( { purchasable: sum > 0 } );
    }

addIngredientHandler = (type) =>{
  const oldCount = this.state.ingredients[type]
  const updatedCount = oldCount + 1
  const updatedIngredients = {
    ...this.state.ingredients
  }
  updatedIngredients[type] = updatedCount
  const ingredient_price =INGREDIENTS_PRICE[type]
  const oldPrice = this.state.totalPrice
  const newPrice = oldPrice + ingredient_price

  this.setState({totalPrice:newPrice,ingredients:updatedIngredients})
  this.updatePurchaseState(updatedIngredients);
}

removeIngredientHandler = (type) =>{
  if(this.state.ingredients[type] > 0){
    const oldCount = this.state.ingredients[type]
    const updatedCount = oldCount - 1
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount
    const ingredient_price =INGREDIENTS_PRICE[type]
    const oldPrice = this.state.totalPrice
    const newPrice = oldPrice - ingredient_price

    this.setState({totalPrice:newPrice,ingredients:updatedIngredients})
    this.updatePurchaseState(updatedIngredients);
  }
}

modalClosingHandler = () => {
  this.setState({purchasing:false})
}

continueHandler = () => alert('hey u placing order')

  render() {
    const disabledInfo = {
    ...this.state.ingredients
};
for ( let key in disabledInfo ) {
    disabledInfo[key] = disabledInfo[key] <= 0
}
    return (
      <Fragment>

      <Modal show={this.state.purchasing} modalclosed={this.modalClosingHandler}>
      <OrderSummary ingredients={this.state.ingredients}
      cancel={this.modalClosingHandler}
      continue={this.continueHandler}
      price={this.state.totalPrice}/>
      </Modal>

        <Burger ingredients={this.state.ingredients} />

        <BuildControls add_ing={this.addIngredientHandler} del_ing={this.removeIngredientHandler} price={this.state.totalPrice}
        disabled={disabledInfo}
        purchasable={this.state.purchasable}
        ordered={this.purchaseHandler}
        />
      </Fragment>
    )
  }
}
