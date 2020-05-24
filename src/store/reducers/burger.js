import * as actionType from '../actions/actionTypes'

const initialState = {
	ingredients:null,
	totalPrice:20,
	error:false,
	isbuilding:false
}

const INGREDIENTS_PRICE ={
  salad:17,
  cheese:15,
  meat:22,
  bacon:18
}

const reducer = (state = initialState,action) => {

switch(action.type)
{
	case actionType.ADD_INGREDIENTS:
	return{
	...state,
	ingredients:{
		...state.ingredients,
		[action.ingredient_type]:state.ingredients[action.ingredient_type]+1
	},
	totalPrice:state.totalPrice + INGREDIENTS_PRICE[action.ingredient_type],
	isbuilding:true
	}

	case actionType.DEL_INGREDIENTS:
	return{
	...state,
	ingredients:{
		...state.ingredients,
		[action.ingredient_type]:state.ingredients[action.ingredient_type]-1
	},
	totalPrice:state.totalPrice - INGREDIENTS_PRICE[action.ingredient_type],
	isbuilding:true
	}

	case actionType.SET_INGREDIENTS:
	return{
		...state,
		ingredients:action.ingredients,
		error:false,
		totalPrice:20,
		isbuilding:false
	}

		case actionType.FETCH_INGREDIENTS_FAILED:
	return{
		...state,
		error:true
	}

	default:
	return state
}

}

export default reducer