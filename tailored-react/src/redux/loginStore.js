import {LOGIN_USER, LOGOUT_USER} from '../constants/LoginConstants';
import BaseStore from './BaseStore';
import jwt_decode from 'jwt-decode';

class LoginStore extends BaseStore {

  constructor() {
    // First we register to the Dispatcher to listen for actions.
    this.dispatchToken = AppDispatcher.register(this._registerToActions.bind(this));
    this._user = null;
    this._jwt = null;
  }

  _registerToActions(action) {
    switch(action.actionType) {
      case USER_LOGGED_IN:
        // We get the JWT from the action and save it locally.
        this._jwt = action.jwt;
        console.log(this._jwt);
        // Then we decode it to get the user information.
        this._user = jwt_decode(this._jwt);
        // And we emit a change to all components that are listening.
        // This method is implemented in the `BaseStore`.
        this.emitChange();
        break;
      default:
        break;
    };
  }

  // Just getters for the properties it got from the action.
  get user() {
    return this._user;
  }

  get jwt() {
    return this._jwt;
  }

  isLoggedIn() {
    return !!this._user;
  }
}
export default new LoginStore();