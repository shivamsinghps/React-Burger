import * as actionTypes from './actionTypes'
import axios from '../../axios-order'

export const addIngredient = (name) =>{
	return {
		type:actionTypes.ADD_INGREDIENTS,
		ingredient_type:name
	}
}

export const delIngredient = (name) =>{
	return {
		type:actionTypes.DEL_INGREDIENTS,
		ingredient_type:name
	}
}

export const setIngredients = (ingredients) =>{
	return {
		type:actionTypes.SET_INGREDIENTS,
		ingredients:ingredients
	}
}

export const fetchingredientsfailed = () =>{
	return{
		type:actionTypes.FETCH_INGREDIENTS_FAILED
	}
}

export const init_Ingredients = () =>{
	return dispatch =>{
	 axios.get( '/ingredients.json' )
            .then( response => {
                dispatch( setIngredients(response.data) );
            } )
            .catch( error => {
                dispatch(fetchingredientsfailed())
            } );
	}
}