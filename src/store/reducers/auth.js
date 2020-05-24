import * as actionTypes from '../actions/actionTypes'

const initialState ={
	token:null,
	userId:null,
	error:null,
	loading:false,
	authredirect:'/'
}

const reducer = (state=initialState , action )=>{
	switch(action.type)
	{	
	    case actionTypes.AUTH_REDIRECT_PATH:
		return{
			...state,
			authredirect:action.path
		}
		case actionTypes.AUTH_LOGOUT:
		return{
		...state,
		token:null,
		userId:null
		}
		case actionTypes.AUTH_START:
		return{
			...state,
			error:null,
			loading:true
		}
		case actionTypes.AUTH_SUCCESS:
		return{
			...state,
			token:action.token,
			userId:action.userId,
			error:null,
			loading:false
		}
		case actionTypes.AUTH_FAILURE:
		return{
			...state,
			error:action.error,
			loading:false
		}
		default:
		return state
	}
}

export default reducer