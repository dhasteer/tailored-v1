import * as ActionTypes from './ActionTypes';

export const Login = (state = {
		id: null,
		loggedIn: false
	}, action) => {
	switch(action.type) {
		case ActionTypes.LOGIN_USER:
			return {...state, id: action.payload, loggedIn: true};

		default: 
			return state;
	}
}