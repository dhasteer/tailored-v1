import React, { Component } from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import SignUp from './SignUpComponent';
import Login from './LoginComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postLogin, fetchShirts, postSignUp } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

const mapStateToProps = state => {
  return {
    shirts: state.shirts,
    login: state.loginData.id
  }    
}

const mapDispatchToProps = (dispatch) => ({
  fetchShirts: () => {dispatch(fetchShirts())},
  resetLogin: () => {dispatch(actions.reset('login'))},
  resetSignUp: () => {dispatch(actions.reset('signup'))},
  postLogin: (username, password) => dispatch(postLogin(username, password)),
  postSignUp: (firstname, email, username, password, survey) => dispatch(postSignUp(firstname, email, username, password, survey))
});

class Main extends Component {

/*
  constructor(props) {
    super(props);

  }
*/


  componentDidMount() {
    this.props.fetchShirts();
  }

  render() {

    const HomePage = () => {
      return(
        <Home shirts={this.props.shirts}
        login={this.props.login}/>
      );
    }


    const LoginPage = () => {
      return(
        <Login postLogin={this.props.postLogin}
        resetLogin = {this.props.resetLogin}/>
      );
    }

    const SignUpPage = () => {
      return(
        <SignUp postSignUp={this.props.postSignUp}
        resetSignUp = {this.props.resetSignUp}/>
      );
    }

    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage}/>
          <Route path="/login" component={LoginPage}/> />
          <Route path="/signup" component={SignUpPage}/>
          <Redirect to ="/login" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));


//          <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />}/>

