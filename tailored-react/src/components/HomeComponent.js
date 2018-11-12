import React from 'react';
import { Card, CardImg, CardTitle, CardBody, CardText, Button } from 'reactstrap'; 
import { Loading } from './LoadingComponent';
import { sendEmail, learnUser } from '../redux/ActionCreators';

    

    const Shirts = (props) => {

    function RenderShirt({shirt}) {
        return(
            <Card>
                <a href={shirt.siteurl} target="_blank" onClick={() => sendEmail(props.login, shirt._id)}>
                    <CardImg width="100%" src={shirt.imageurl} alt={shirt.name}/>
                </a>
                <CardBody>
                    <CardTitle>{shirt.store}</CardTitle>
                    <CardText>{shirt.name}</CardText>
                    <CardText>${shirt.price} {' '}
                        <Button color = "primary" className="fa fa-thumbs-up fa-sm" onClick={()=>learnUser(props.login, shirt._id, 'y')}></Button> {' '}
                        <Button color = "primary" className="fa fa-thumbs-down fa-sm" onClick={()=>learnUser(props.login, shirt._id, 'n')}></Button>
                    </CardText>
                </CardBody>
            </Card>
        );
    }

        const shirts = props.shirts.shirts.map((shirt) => {
            return (
                <div key={shirt._1id} className="col-12 col-md-3 m-0">
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
                            <h3>Just For You</h3>
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