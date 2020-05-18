import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactDetail from './ContactDetails/ContactDetail'
import {Route} from 'react-router-dom'

class Checkout extends Component {

  state={
    ingredients:{
      salad:0,
      meat:0,
      cheese:0,
      bacon:0
    },
    totalPrice:20

  }

componentDidMount(){
  let query = new URLSearchParams(this.props.location.search)
  const items ={
    salad:parseInt(query.get('salad')),
    meat:parseInt(query.get('meat')),
    cheese:parseInt(query.get('cheese')),
    bacon:parseInt(query.get('bacon'))
  }
  const totalPrice = parseInt(query.get('price'))
  if(!isNaN(items.salad)){
  this.setState({ingredients:items})
}
if(!isNaN(totalPrice))
{
  this.setState({totalPrice:totalPrice})
}
}

continueHandler = () =>{
  this.props.history.replace('/checkout/contact-details')
}

cancelHandler = () =>{
  this.props.history.goBack()
}


  render() {
    return (
        <div><CheckoutSummary
        ingredients={this.state.ingredients}
        cancel={this.cancelHandler}
        continue={this.continueHandler}
        />
        <Route path={this.props.match.path + '/contact-details'} render={(props)=>(<ContactDetail ingredients={this.state.ingredients}
          price={this.state.totalPrice} {...props}/>)} />
        </div>
    )
  }
}

export default Checkout
