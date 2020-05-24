import React, { Component , Fragment } from 'react'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-order'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../withErrorHandle/withErrorHandle'
import {connect} from 'react-redux'
import * as burgerAction from '../../store/actions'



class BurgerBuilder extends Component {
state={
  purchasing:false,
}

componentDidMount(){
	this.props.init_Ingredients()
}

purchaseHandler = () => {
if(this.props.isAuthenticated){
  this.setState({purchasing: true})
  }
  else{
  this.props.onSetAuthRedirect('/checkout')
  this.props.history.push('/auth')
  }
}

updatePurchaseState (ingredients) {
        const sum = Object.keys( ingredients )
            .map( igKey => {
                return ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        return sum > 0 
    }


modalClosingHandler = () => {
  this.setState({purchasing:false})
}

continueHandler = ()=>{
this.props.purchasing()
this.props.history.push('/checkout')
}

render() {
    const disabledInfo = {
    ...this.props.ing
};
  for ( let key in disabledInfo ) {
    disabledInfo[key] = disabledInfo[key] <= 0
  }

  let orderSummary = null

  let burger = this.props.error ?<h1>500: Server Error</h1>:<Spinner />

  if(this.props.ing){
    burger =(<Fragment>

            <Burger ingredients={this.props.ing} />

            <BuildControls add_ing={this.props.OnaddIngredient} del_ing={this.props.OndelIngredient} price={this.props.totalPrice}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ing)}
            ordered={this.purchaseHandler}
			isAuth={this.props.isAuthenticated}

            />

			</Fragment>
			)

    orderSummary = <OrderSummary ingredients={this.props.ing}
                        cancel={this.modalClosingHandler}
                        continue={this.continueHandler}
                        price={this.props.totalPrice}/>
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

const mapStateToProps=state=>{

	return{
		ing:state.burger.ingredients,
		totalPrice:state.burger.totalPrice,
		error:state.burger.error,
		isAuthenticated:state.auth.token !== null
	}
}

const mapDispatchToProps=dispatch=>{
	return{
	OnaddIngredient:(type)=> dispatch(burgerAction.addIngredient(type)),
	OndelIngredient:(type)=> dispatch(burgerAction.delIngredient(type)),
	init_Ingredients:()=> dispatch(burgerAction.init_Ingredients()),
	purchasing : () =>dispatch(burgerAction.purchasing()),
	onSetAuthRedirect:(path)=>dispatch(burgerAction.authredirect(path))
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios))
