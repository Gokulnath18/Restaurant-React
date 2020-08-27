import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderDish({ dish }) {
    if (dish !== null && dish !== undefined) {
        return (
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    }
    else {
        return (
            <div></div>
        );
    }
}

function RenderComment({ comments }) {
    if (comments !== null && comments !== undefined) {
        const comment = comments.map((comment) => {
            comment.date = new Intl.DateTimeFormat('en-IR', { year: 'numeric', month: 'short', day: '2-digit' })
                .format(new Date(Date.parse(comment.date)));
            return (
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>
                        -- {comment.author},
                        <span> {comment.date}</span>
                    </p>
                </li>
            );
        });

        return (
            <div>
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {comment}
                </ul>
            </div>
        );
    }
    else {
        return (
            <div></div>
        );
    }
}

const DishDetail = (props) => {
    if (props.dish !== null && props.dish !== undefined)
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComment comments={props.comments} />
                    </div>
                </div>
            </div>
        );
    else
        return (
            <div></div>
        );
    // return (
    //     <div className="row">
    //         {/* <DishDetail selectedDish={this.state.selectedDish}/> */}
    //         <div className="col-12 col-md-5 m-1">
    //             <RenderDish dish={props.dish}/>
    //             {/* {this.renderDish(this.props.dish)} */}
    //         </div>
    //         <div className="col-12 col-md-5 m-1">
    //             <RenderComment comments={props.comments}/>
    //             {/* {this.renderComment(this.props.dish)} */}
    //         </div>
    //     </div>
    // );
}

export default DishDetail;