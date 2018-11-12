import { baseUrl } from '../shared/baseUrl';
import LoginActions from '../redux/LoginAction';

class AuthService {

  login(username, password) {
    // We call the server to log the user in.
    const loginInfo = {
      username: "dhasteer",
      password: "dh012201"
    }
    console.log(JSON.stringify(loginInfo));

    return fetch(baseUrl + 'users/login', {
      method: 'POST',
      body: JSON.stringify(loginInfo),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'cross-origin'
    })
    .then(function(response) {
        return response.json()
    })
    .then((data)=>{
        // We get a JWT back.
        let jwt = data.token;
        console.log(jwt);
        // We trigger the LoginAction with that JWT.
        LoginActions.loginUser(jwt);
        return true;
    });
  }
}

export default new AuthService()


