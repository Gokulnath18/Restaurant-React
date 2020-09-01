import React, { Component } from "react";
import {
    Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader,
    ModalBody, Label, Col, Row
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseURL } from '../shared/baserURL';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmitComment = this.handleSubmitComment.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmitComment(values) {
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render() {
        return (
            <div>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"> Submit Comment</span>
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmitComment(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={4}>Rating</Label>
                                <Col md={10}>
                                    <Control.select model=".rating" id="rating" name="rating" className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label hmtlFor="author" md={4}>Your Name</Label>
                                <Col md={10}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="your name" className="form-control"
                                        validators={{ required, minLength: minLength(3), maxLength: maxLength(15) }} />
                                    <Errors className="text-danger" model=".author" show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be more than 2 characters',
                                            maxLength: 'Must be less than 15 characters'
                                        }}></Errors>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={4}>Comment</Label>
                                <Col md={10}>
                                    <Control.textarea model=".comment" id="comment" name="comment" rows="4"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Button type="submit" color="primary">Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

function RenderDish({ dish }) {
    if (dish !== null && dish !== undefined) {
        return (
            <FadeTransform in transformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)'
            }}>
                <Card>
                    <CardImg width="100%" src={baseURL + dish.image} alt={dish.name}></CardImg>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        );
    }
    else {
        return (
            <div></div>
        );
    }
}

function RenderComment({ comments, postComment, dishId }) {
    if (comments !== null && comments !== undefined) {
        const comment = comments.map((comment) => {
            comment.date = new Intl.DateTimeFormat('en-IR', { year: 'numeric', month: 'short', day: '2-digit' })
                .format(new Date(Date.parse(comment.date)));
            return (
                <Fade in>
                    <li key={comment.id}>
                        <p>{comment.comment}</p>
                        <p>
                            -- {comment.author},
                        <span> {comment.date}</span>
                        </p>
                    </li>
                </Fade>
            );
        });

        return (
            <div>
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    <Stagger in>
                        {comment}
                    </Stagger>
                </ul>
                <div>
                    <CommentForm postComment={postComment} dishId={dishId} />
                </div>
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
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMsg) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMsg}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish !== null && props.dish !== undefined)
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
                        <RenderComment comments={props.comments}
                            postComment={props.postComment} dishId={props.dish.id} />
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