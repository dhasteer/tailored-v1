import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form';
import { Shirts } from './shirts';
import { Login } from './login'
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { LoginInfo, SignUpInfo } from './forms';

export const ConfigureStore = () => {
	const store = createStore(
		combineReducers({
			shirts: Shirts,
			loginData: Login,
			...createForms({
				login: LoginInfo,
				signup: SignUpInfo
			})
		}),
		applyMiddleware(thunk, logger)
	);

	return store;
}