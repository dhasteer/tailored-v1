import * as ActionTypes from './ActionTypes';

export const Shirts = (state = {
		isLoading: true,
		errMess: null,
		shirts: []
	}, action) => {
	switch(action.type) {
		case ActionTypes.ADD_SHIRTS:
			return {...state, isLoading: false, errMess: null, shirts: action.payload};

		case ActionTypes.SHIRTS_LOADING:
			return {...state, isLoading: true, errMess: null, shirts: []};

		case ActionTypes.SHIRTS_FAILED:
			return {...state, isLoading: false, errMess: action.payload, shirts: []};

		default: 
			return state;
	}
}