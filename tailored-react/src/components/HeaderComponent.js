import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom'; 

class Header extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isNavOpen: false,
			isModalOpen: false
		};
		this.toggleNav = this.toggleNav.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
	}

	toggleNav() {
		this.setState({
			isNavOpen: !this.state.isNavOpen
		});
	}

	toggleModal() {
		this.setState({
			isModalOpen: !this.state.isModalOpen
		});
	}

	handleLogin(event) {
		this.toggleModal();
		alert("Username: "+this.username.value+"Password: "+this.password.value
			+" Remember: "+this.remember.checked);
		event.preventDefault();
	}

	render() {
		return (
			<React.Fragment>
		        <Navbar dark expand="md">
		          <div className="container">
		          	<NavbarToggler onClick={this.toggleNav} />
		            <NavbarBrand className="mr-auto" href="/">
		            	<img src="http://res.cloudinary.com/hrscywv4p/image/upload/c_limit,fl_lossy,h_1440,w_720,f_auto,q_auto/v1/1421496/Tailored_wilvps.png" height="30" width="41"
		            		alt="Tailored" />
		            </NavbarBrand>
		            <Collapse isOpen={this.state.isNavOpen} navbar>
		            	<Nav navbar>
		            		<NavItem>
		            			<NavLink className="nav-link" to="/home">
		            				<span className="fa fa-home fa-lg"></span> Home
		            			</NavLink>
		            		</NavItem>
		            		<NavItem>
		            			<NavLink className="nav-link" to="/login">
		            				<span className="fa fa-pencil fa-lg"></span> Login
		            			</NavLink>
		            		</NavItem>
		            	</Nav>
		            </Collapse>
		          </div>
		        </Navbar>
			</React.Fragment>
		)
	}
}

export default Header;