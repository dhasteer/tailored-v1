import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const sendEmail = (userId, shirtId) => {
  return fetch(baseUrl + 'shirts/email/' + userId + '/' + shirtId)
}

export const learnUser = (userId, shirtId, pref) => {
  return fetch(baseUrl+'shirts/'+userId+'/'+shirtId+'/'+pref , {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    })
} 

export const fetchShirts = (userId) => (dispatch) => {
	dispatch(shirtsLoading(true));


	return fetch(baseUrl + 'shirts/' + userId + '/1000000')
		.then(response => {
			if (response.ok){
				return response;
			}
			else {
				var error = new Error('Error '+ response.status +': '+response.statusText);
				error.response = response;
				throw error;
			}
		},
		error => {
			var errmess = new Error(error.message);
			throw errmess;
		})
		.then(response => response.json())
		.then(shirts => dispatch(addShirts(shirts)))
		.catch(error => dispatch(shirtsFailed(error.message)));
}

export const shirtsLoading = () => ({
	type: ActionTypes.SHIRTS_LOADING
});

export const shirtsFailed = (errmess) => ({
	type: ActionTypes.SHIRTS_FAILED,
	payload: errmess
});

export const addShirts = (shirts) => ({
	type: ActionTypes.ADD_SHIRTS,
	payload: shirts
});

export const postLogin = (username, password) => (dispatch) => {
    // We call the server to log the user in.
    const loginInfo = {
      username: username,
      password: password
    }
    console.log(JSON.stringify(loginInfo));

    return fetch(baseUrl + 'users/login', {
      method: 'POST',
      body: JSON.stringify(loginInfo),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    })
    .then(function(response) {
        return response.json()
    })
    .then((data)=>{
        // We get a JWT back.
        let id = data.id;
        console.log(id);
        // We trigger the LoginAction with that JWT.
        //LoginActions.loginUser(jwt);
        return(id)
    })
    .then(id => dispatch(login(id)))
    .then(id => dispatch(fetchShirts(id.payload)))
  }

export const login = (id) => ({
	type: ActionTypes.LOGIN_USER,
	payload: id
})

export const postSignUp = (firstname, email, username, password, survey) => (dispatch) => {
    // We call the server to log the user in.

   	const shirt0vector = [0,1,0,0,1,0,1,0,1,0,0,0,1,0,1,0,0,0,1,0,0,1];
    const shirt1vector = [0,1,0,0,1,0,1,0,1,0,0,0,1,0,1,0,0,0,1,0,0,1];
    const shirt2vector = [0,1,0,0,1,0,1,0,1,0,0,0,1,0,1,0,0,0,1,0,0,1];
   	const shirt3vector = [0,1,0,0,1,0,1,0,1,0,0,0,1,0,1,0,0,0,1,0,0,1];
   	const shirt4vector = [0,1,0,0,1,0,1,0,1,0,0,0,1,0,1,0,0,0,1,0,0,1];
   	const shirt5vector = [0,1,0,0,1,0,1,0,1,0,0,0,1,0,1,0,0,0,1,0,0,1];
   	const shirt6vector = [0,1,0,0,1,0,1,0,1,0,0,0,1,0,1,0,0,0,1,0,0,1];
   	const shirt7vector = [0,1,0,0,1,0,1,0,1,0,0,0,1,0,1,0,0,0,1,0,0,1];
   	var shirtsvector = [shirt0vector, shirt1vector, shirt2vector, shirt3vector, 
   		shirt4vector, shirt5vector, shirt6vector, shirt7vector];
   	var uservector = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

   	for (var counter=0; counter<shirtsvector.length; counter++) {
   		var shirtarray = shirtsvector[counter];
   		if (survey[counter] === 'Like') {
   			for (var count = 0; count < uservector.length; count++){
	            uservector[count] = uservector[count] + shirtarray[count];
	         };
   		} else if (survey[counter] === 'Dislike') {
   			for (count = 0; count < uservector.length; count++){
	            uservector[count] = uservector[count] - shirtarray[count];
	         };
   		}
   	}

    const signUpInfo = {
      firstname: firstname,
      email: email,
      username: username,
      password: password,
      vector: uservector
    }
    console.log(JSON.stringify(signUpInfo));

    return fetch(baseUrl + 'users/signup', {
      method: 'POST',
      body: JSON.stringify(signUpInfo),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    })
    .then(function(response) {
        return response.json()
    })
    .then((res)=>{
        // We get a JWT back.
        console.log(res.status)
    })
  }

/*
export const addComment = (comment) => ({
	type: ActionTypes.ADD_COMMENT,
	payload: comment
});

export const postComment = (dishId, rating, author, comment) => (dispatch) => {
	
	const newComment = {
		dishId: dishId,
		rating: rating,
		author: author,
		comment: comment
	}
	
	newComment.date = new Date().toISOString();

	return fetch(baseUrl + 'comments', {
		method: 'POST',
		body: JSON.stringify(newComment),
		headers: {
			'Content-Type': 'application/json'
		},
		credentials: 'same-origin'
	})
		.then(response => {
			if (response.ok){
				return response;
			}
			else {
				var error = new Error('Error '+ response.status +': '+response.statusText);
				error.response = response;
				throw error;
			}
		},
		error => {
			var errmess = new Error(error.message);
			throw errmess;
		})
		.then(response => response.json())
		.then(response => dispatch(addComment(response)))
		.catch(error => {console.log('Post comments', error.message);
			alert('Your comment could not be posted\nError: ')+ error.message});
};
*/