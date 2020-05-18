import React, { Component } from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-order'
import withErrorHandler from '../withErrorHandle/withErrorHandle'
class Orders extends Component {
  state = {
    orders:[],
    loading:true
  }

  componentDidMount(){
    axios.get('/orders.json')
    .then(res=>{

      const fetchOrder = []
      for(let key in res.data)
      {
        fetchOrder.push({...res.data[key],id:key})
      }
      this.setState({orders:fetchOrder,loading:false})
    }).catch(error=>
      {
        this.setState({loading:false})
  })
  }
  render() {

    return (
      <div>
        {this.state.orders.map(
          order =><Order key={order.id} ingredients={order.ingredients} price={order.price} orderData={order.orderData}/>
        )}
      </div>
    )
  }
}

export default withErrorHandler(Orders,axios)
