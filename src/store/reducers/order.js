import * as actionTypes from '../actions/actionTypes'

const initialState = {
	orders:[],
	loading:false,
	purchased:false
}

const reducer = (state=initialState,action)=>{
	switch(action.type){
		case actionTypes.ORDER_START:
		return{
			...state,
			loading:true
		}
		case actionTypes.ORDER_SUCCESS:
		return{
			...state,
			orders:action.orders,
			loading:false
		}
		case actionTypes.ORDER_FAILURE:
		return{
			...state,
			loading:false
		}
		case actionTypes.PURCHASING:
		return{
			...state,
			purchased:false
		}
		case actionTypes.PURCHASE_BURGER_START:
		return {
		...state,
		loading:true
		}		
		case actionTypes.PURCHASE_BURGER_SUCCESS:
		const neworder = {
		...action.orderdata,
		id:action.orderid
		}
		return {
		...state,
		loading:false,
		orders:state.orders.concat(neworder),
		purchased:true
		}
		case actionTypes.PURCHASE_BURGER_FAILURE:
		return {
		...state,
		loading:false
		}
		default:
		return state
	}
}

export default reducer