import React, { Component } from 'react';
import { Col, Row, Label, Button, Card, CardBody, CardImg } from 'reactstrap';
import { Form, Control, Errors } from 'react-redux-form';
import { Redirect } from 'react-router-dom';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

export default class SignUp extends Component {

  constructor(props) {
    super(props);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = {
      redirect: false
    }
  }

  handleSignUp(values){
    var survey = [values.surveyshirt1, values.surveyshirt2, values.surveyshirt3, values.surveyshirt4, 
      values.surveyshirt5, values.surveyshirt6,values.surveyshirt7, values.surveyshirt8]
    this.props.postSignUp(values.firstname, values.email, values.username, values.password, survey);
    this.props.resetSignUp();
    this.setState({redirect: true});
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
        return (<Redirect to='/login'/>)
    }
    return (
      <div className = "container">
        <Form model="signup" onSubmit={(values) => this.handleSignUp(values)}>
          <Row className="form-group">
              <Label htmlFor="firstname" md={2}>First Name</Label>
              <Col md={10}>
                  <Control.text model=".firstname" id="firstname" name="firstname"
                      placeholder="First Name"
                      className="form-control"
                      validators={{
                          required, minLength: minLength(3), maxLength: maxLength(15)
                      }} />
                  <Errors
                      className="text-danger"
                      model=".name"
                      show="touched"
                      messages={{
                          required: 'Required',
                          minLength: 'Must be greater than 2 characters',
                          maxLength: 'Must be 15 characters or less'
                      }}
                  />
              </Col>
          </Row>
          <Row className="form-group">
              <Label htmlFor="email" md={2}>Email</Label>
              <Col md={10}>
                  <Control.text model=".email" id="email" name="email"
                      placeholder="Email"
                      className="form-control"
                      validators={{
                          required, validEmail
                      }} />
                  <Errors
                      className="text-danger"
                      model=".email"
                      show="touched"
                      messages={{
                          required: 'Required',
                          validEmail: 'Invalid Email Address' 
                      }}
                  />
              </Col>
          </Row>
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
                  <Control.text model=".password" id="password" name="password"
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
          
          <h4>Help us help you by filling out your clothing preferences below! Ensure a Tailored experience. </h4>

          <Row>
            <div className="col-12 col-md-3 m-0">
              <Card> 
                <CardImg width="100%" src="https://s7.ralphlauren.com/is/image/PoloGSI/s7-1275955_lifestyle?$rl_506_630$"/>
                <CardBody>
                  <Control.select model=".surveyshirt1" name="surveyshirt1"
                      className="form-control">
                      <option></option>
                      <option>Like</option>
                      <option>Dislike</option>
                  </Control.select>
                </CardBody>
              </Card>
            </div>

            <div className="col-12 col-md-3 m-0">
              <Card> 
                <CardImg width="100%" src="https://s7.ralphlauren.com/is/image/PoloGSI/s7-1275955_lifestyle?$rl_506_630$"/>
                <CardBody>
                  <Control.select model=".surveyshirt2" name="surveyshirt2"
                      className="form-control">
                      <option></option>
                      <option>Like</option>
                      <option>Dislike</option>
                  </Control.select>
                </CardBody>
              </Card>
            </div>

            <div className="col-12 col-md-3 m-0">
              <Card> 
                <CardImg width="100%" src="https://s7.ralphlauren.com/is/image/PoloGSI/s7-1275955_lifestyle?$rl_506_630$"/>
                <CardBody>
                  <Control.select model=".surveyshirt3" name="surveyshirt3"
                      className="form-control">
                      <option></option>
                      <option>Like</option>
                      <option>Dislike</option>
                  </Control.select>
                </CardBody>
              </Card>
            </div>

            <div className="col-12 col-md-3 m-0">
              <Card> 
                <CardImg width="100%" src="https://s7.ralphlauren.com/is/image/PoloGSI/s7-1275955_lifestyle?$rl_506_630$"/>
                <CardBody>
                  <Control.select model=".surveyshirt4" name="surveyshirt4"
                      className="form-control">
                      <option></option>
                      <option>Like</option>
                      <option>Dislike</option>
                  </Control.select>
                </CardBody>
              </Card>
            </div>

          </Row>
          <Row>

            <div className="col-12 col-md-3 m-0">
              <Card> 
                <CardImg width="100%" src="https://s7.ralphlauren.com/is/image/PoloGSI/s7-1275955_lifestyle?$rl_506_630$"/>
                <CardBody>
                  <Control.select model=".surveyshirt5" name="surveyshirt5"
                      className="form-control">
                      <option></option>
                      <option>Like</option>
                      <option>Dislike</option>
                  </Control.select>
                </CardBody>
              </Card>
            </div>

            <div className="col-12 col-md-3 m-0">
              <Card> 
                <CardImg width="100%" src="https://s7.ralphlauren.com/is/image/PoloGSI/s7-1275955_lifestyle?$rl_506_630$"/>
                <CardBody>
                  <Control.select model=".surveyshirt6" name="surveyshirt6"
                      className="form-control">
                      <option></option>                    
                      <option>Like</option>
                      <option>Dislike</option>
                  </Control.select>
                </CardBody>
              </Card>
            </div>

            <div className="col-12 col-md-3 m-0">
              <Card> 
                <CardImg width="100%" src="https://s7.ralphlauren.com/is/image/PoloGSI/s7-1275955_lifestyle?$rl_506_630$"/>
                <CardBody>
                  <Control.select model=".surveyshirt7" name="surveyshirt7"
                      className="form-control">
                      <option></option>
                      <option>Like</option>
                      <option>Dislike</option>
                  </Control.select>
                </CardBody>
              </Card>
            </div>

            <div className="col-12 col-md-3 m-0">
              <Card> 
                <CardImg width="100%" src="https://s7.ralphlauren.com/is/image/PoloGSI/s7-1275955_lifestyle?$rl_506_630$"/>
                <CardBody>
                  <Control.select model=".surveyshirt8" name="surveyshirt8"
                      className="form-control">
                      <option></option>
                      <option>Like</option>
                      <option>Dislike</option>
                  </Control.select>
                </CardBody>
              </Card>
            </div>
          </Row>

          <Row className="form-group">
            <Col md={{size:10}}>
                <Button type="submit" color="primary">
                  Sign Up
                </Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}
