import React from 'react';
import { Card, CardImg, CardTitle, CardBody, CardText, Breadcrumb, BreadcrumbItem, Button } from 'reactstrap'; 
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';

	function RenderShirt({shirt, onClick}) {
		return(
			<Card>
				<a href={shirt.siteurl}>
				<CardImg width="100%" src={shirt.imageurl} alt={shirt.name} />
				</a>
				<CardBody>
					<div className="text-center">
						<Button className="fa fa-thumbs-up fa-lg" onClick></Button>
						{' '}
						<Button className="fa fa-thumbs-down fa-lg"></Button>
					</div>
				</CardBody>
			</Card>
		);
	}

	const Shirts = (props) => {

		const shirts = props.shirts.shirts.map((shirt) => {
			return (
				<div key={shirt.id} className="col-12 col-md-3 m-0">
					<RenderShirt shirt={shirt}/>
				</div>
			);
		}); 

		if (props.shirts.isLoading) {
			return(
				<div className="container">
					<div className="row">
						<Loading />
					</div>
				</div>
			);
		}
		else if (props.errMess) {
			return(
				<div className="container">
					<div className="row">
						<h4>{props.shirts.errMess}</h4>
					</div>
				</div>
			);			
		}
		else {
			return (
				<div className = "container">
					<div className = "row">						
						<div className="col-12">
							<hr />
							<h3>Discover New Styles</h3>
							<hr />
						</div> 
					</div>
					<div className = "row">
						{shirts}
					</div>
				</div>	
			);
		}
	}

export default Shirts;