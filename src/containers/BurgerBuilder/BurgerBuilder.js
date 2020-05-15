import React, { Component , Fragment } from 'react'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-order'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../withErrorHandle/withErrorHandle'

const INGREDIENTS_PRICE ={
  salad:17,
  cheese:15,
  meat:22,
  bacon:18
}

class BurgerBuilder extends Component {
state={
  ingredients:null,
  totalPrice: 20,
  purchasable:false,
  purchasing:false,
  loading: false,
  error:false
}

componentDidMount () {
        axios.get( '/ingredients.json' )
            .then( response => {
                this.setState( { ingredients: response.data } );
            } )
            .catch( error => {
                this.setState( { error: true } );
            } );
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

continueHandler = ()=>{
  this.setState({loading:true})
  const order ={
    ingredients:this.state.ingredients,
    price:this.state.totalPrice,
    customer:{
      name:'Shivam',
      address:'kiit',
    },
    dileverytype:'lightning'
  }

  axios.post('/orders.json',order).then(response=>this.setState({loading:false,purchasing:false})).catch(error=>this.setState({loading:false,purchasing:false}))

}

  render() {
    const disabledInfo = {
    ...this.state.ingredients
};
for ( let key in disabledInfo ) {
    disabledInfo[key] = disabledInfo[key] <= 0
}
let orderSummary = null

  if(this.state.loading)
  {
    orderSummary=<Spinner />
  }

  let burger = this.state.error ?<h1>500: Server Error</h1>:<Spinner />

  if(this.state.ingredients){
    burger =(<Fragment>
            <Burger ingredients={this.state.ingredients} />

            <BuildControls add_ing={this.addIngredientHandler} del_ing={this.removeIngredientHandler} price={this.state.totalPrice}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
            /></Fragment>)

    orderSummary = <OrderSummary ingredients={this.state.ingredients}
                        cancel={this.modalClosingHandler}
                        continue={this.continueHandler}
                        price={this.state.totalPrice}/>
  }

    return (
      <Fragment>

      <Modal show={this.state.purchasing} modalclosed={this.modalClosingHandler}>
      {orderSummary}
      </Modal>
      {burger}
      </Fragment>
    )
  }
}

export default withErrorHandler(BurgerBuilder,axios)
