import * as actionTypes from './actionTypes'
import axios from '../../axios-order'

export const purchaseburgersuccess = (id,orderData) =>{
return{
	type:actionTypes.PURCHASE_BURGER_SUCCESS,
	orderid:id,
	orderdata:orderData
}
}

export const purchaseburgerfailure = (error) =>{
return{
	type:actionTypes.PURCHASE_BURGER_FAILURE,
	error:error
}
}

export const purchaseburgerstart = () =>{
	return {
		type:actionTypes.PURCHASE_BURGER_START
	}
}

export const purchaseburgerinit = (orderData,token) =>{
	return dispatch =>{
	  dispatch(purchaseburgerstart())
	  axios.post('/orders.json?auth='+token,orderData)
      .then(response=>
	  {
	  dispatch(purchaseburgersuccess(response.data.name,orderData))
	  })
	  .catch(error=>
	  {
	  dispatch(purchaseburgerfailure(error))
	  })
	}
}

export const purchasing = () =>{
	return{
		type:actionTypes.PURCHASING
	}
}

export const ordersuccess = (orders) =>{
	return{
		type:actionTypes.ORDER_SUCCESS,
		orders:orders
	}
}

export const orderstart = () =>{
	return{
		type:actionTypes.ORDER_START
	}
}

export const orderfailure = (error) =>{
	return{
		type:actionTypes.ORDER_FAILURE,
		error:error
	}
}

export const orderinit = (token,userId) => {
	return dispatch => {
			dispatch(orderstart())
			const queryParams = '?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"';
		    axios.get('/orders.json'+queryParams)
			.then(res=>{
			const fetchOrder = []
			for(let key in res.data)
			{
			  fetchOrder.push({...res.data[key],id:key})
			}
			dispatch(ordersuccess(fetchOrder))
			}).catch(error=>
			{
		    dispatch(orderfailure(error))
			})
	}
}