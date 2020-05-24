import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactDetail from './ContactDetails/ContactDetail'
import {Route,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

class Checkout extends Component {


continueHandler = () =>{
  this.props.history.replace('/checkout/contact-details')
}

cancelHandler = () =>{
  this.props.history.goBack()
}

  render() {
  

  let summary = <Redirect to='/' />
  
  if(this.props.ing){
		const purchaseredirect = this.props.purchased ? <Redirect to='/' /> : null
		summary = (
		<div>
		{purchaseredirect}
		<CheckoutSummary
        ingredients={this.props.ing}
        cancel={this.cancelHandler}
        continue={this.continueHandler}/>
        
		<Route path={this.props.match.path + '/contact-details'} component={ContactDetail} />
        </div>)
  }
    return summary 
    
  }
}

const mapStateToProps=state=>{

	return{
		ing:state.burger.ingredients,
		purchased:state.order.purchased
	}
}

export default connect(mapStateToProps)(Checkout)


