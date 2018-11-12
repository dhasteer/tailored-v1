import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Col, Row, Label, Button } from 'reactstrap';
import { Form, Control, Errors } from 'react-redux-form';

const required = (val) => val && val.length;


export default class Login extends Component {

  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.state = {
      redirect: false
    }
  }

  handleLogin(values){
    this.props.postLogin(values.username, values.password);
    this.props.resetLogin();
    this.setState({redirect: true})
  }

/*
  // This will be called when the user clicks on the login button
  login(e) {
    e.preventDefault();
    // Here, we call an external AuthService. We’ll create it in the next step
    Auth.login(this.state.user, this.state.password)
      .catch(function(err) {
        console.log("Error logging in", err);
      });
  }
*/
  render() {
    if (this.state.redirect) {
        return (<Redirect to='/home'/>)
    }
    return (
      <div className = "container">
        <Form model="login" onSubmit={(values) => this.handleLogin(values)}>
          <Row className="form-group">
              <Label htmlFor="username" md={2}>Username</Label>
              <Col md={10}>
                  <Control.text model=".username" id="username" name="username"
                      placeholder="Username"
                      className="form-control"
                      validators={{
                          required
                      }} />
                  <Errors
                      className="text-danger"
                      model=".username"
                      show="touched"
                      messages={{
                          required: 'Required'
                      }}
                  />
              </Col>
          </Row>
          <Row className="form-group">
              <Label htmlFor="password" md={2}>Password</Label>
              <Col md={10}>
                  <Control.text model=".password" type="password" id="password" name="password"
                      placeholder="Password"
                      className="form-control"
                      validators={{
                          required
                      }} />
                  <Errors
                      className="text-danger"
                      model=".password"
                      show="touched"
                      messages={{
                          required: 'Required'
                      }}
                  />
              </Col>
          </Row>
          <Row className="form-group">
            <Col md={{size:10, offset: 2}}>
                <Button type="submit" color="primary">
                  Login
                </Button>
                 or
                <Link to="/signup">
                  <Button color="primary"> 
                    Sign Up
                  </Button>
                </Link>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}
