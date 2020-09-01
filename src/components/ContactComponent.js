import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Label, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, Form, Errors, actions } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9,_%+-]+@[A-Z0-9._]+\.[A-Z]{2,4}$/i.test(val);

class Contact extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            telNum: '',
            email: '',
            agree: false,
            contactType: 'Telephone Number',
            message: '',
            touched: {
                firstName: false,
                lastName: false,
                telNum: false,
                email: false
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleInputChange = this.handleInputChange.bind(this);
        // this.handleBlur = this.handleBlur.bind(this);
    }

    // handleInputChange(event) {
    //     const target = event.target;
    //     const value = target.type === "checkbox" ? target.checked : target.value;
    //     const name = target.name;
    //     this.setState({
    //         [name]: value
    //     });
    // }

    handleSubmit(values) {
        this.props.postFeedback(values.firstName, values.lastName, values.telNum, values.email, values.agree,
            values.contactType, values.message);
        this.props.resetFeedbackForm();
    }

    // handleBlur = (field) => (evt) => {
    //     this.setState({
    //         touched: { ... this.state.touched, [field]: true }
    //     });
    // }

    // validate(firstName, lastName, telNum, email) {
    //     const errors = {
    //         firstName: '',
    //         lastName: '',
    //         telNum: '',
    //         email: ''
    //     }

    //     if (this.state.touched.firstName && (firstName.length < 3 || firstName.length > 10))
    //         errors.firstName = 'First Name should be more than 3 and less than 10 characters';

    //     if (this.state.touched.lastName && (lastName.length < 3 || lastName.length > 10))
    //         errors.lastName = 'Last Name should be more than 3 and less than 10 characters';

    //     const reg = /^\d+$/;
    //     if (this.state.touched.telNum && !reg.test(telNum))
    //         errors.telNum = 'Telephone number should contain only numbers';

    //     if (this.state.touched.email && email.split('').filter(x => x === '@').length !== 1)
    //         errors.email = 'Email should have "@" character';

    //     return errors;
    // }

    render() {
        // const errors = this.validate(this.state.firstName, this.state.lastName, this.state.telNum, this.state.email);
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Contact</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Contact</h3>
                        <hr />
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                        <h5>Our Address</h5>
                        <address>
                            121, Clear Water Bay Road<br />
                            Clear Water Bay, Kowloon<br />
                            HONG KONG<br />
                            <i className="fa fa-phone"></i>: +852 1234 5678<br />
                            <i className="fa fa-fax"></i>: +852 8765 4321<br />
                            <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                        </address>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h5>Map of our Location</h5>
                    </div>
                    <div className="col-12 col-sm-11 offset-sm-1">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                            <a role="button" className="btn btn-info" href="skypeid:live12345"><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Send us your feedback</h3>
                    </div>
                    <div className="col-12 col-md-9">
                        <Form model="feedback" onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="firstName" md={2}>First Name</Label>
                                <Col md={10}>
                                    <Control.text model=".firstName" id="firstName" name="firstName" placeholder="First Name"
                                        className="form-control" validators={{required, minLength: minLength(3),
                                        maxLength: maxLength(15)}} />
                                        <Errors className="text-danger" model=".firstName" show="touched"
                                            messages={{required: 'Required ', minLength: 'Must be more than 3 characters',
                                            maxLength: 'Must be less than 15 characters'}} />
                                    {/* <FormFeedback>{errors.firstName}</FormFeedback> */}
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="lastName" md={2}>Last Name</Label>
                                <Col md={10}>
                                    <Control.text model=".lastName" id="lastName" name="lastName" placeholder="Last Name"
                                        className="form-control" validators={{required, minLength: minLength(3),
                                        maxLength: maxLength(15)}} />
                                    <Errors className="text-danger" model=".lastName" show="touched"
                                        messages={{required: 'Required ', minLength: 'Must be more than 3 characters',
                                        maxLength: 'Must be less than 15 characters'}} />
                                    {/* <FormFeedback>{errors.lastName}</FormFeedback> */}
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="telNum" md={2}>Contact Number</Label>
                                <Col md={10}>
                                    <Control.text model=".telNum" id="telNum" name="telNum" placeholder="Telephone number"
                                        className="form-control" validators={{required, minLength: minLength(3),
                                        maxLength: maxLength(15), isNumber}} />
                                    <Errors className="text-danger" model=".telNum" show="touched"
                                        messages={{required: 'Required ', minLength: 'Must be more than 3 numbers',
                                        maxLength: 'Must be less than 15 numbers',
                                        isNumber: 'Must be a number'}} />
                                    {/* <FormFeedback>{errors.telNum}</FormFeedback> */}
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="email" md={2}>E-mail</Label>
                                <Col md={10}>
                                    <Control.text model=".email" id="email" name="email" placeholder="E-mail"
                                        className="form-control" validators={{required, validEmail}}/>
                                    <Errors className="text-danger" model=".email" show="touched"
                                        messages={{required: 'Required ', validEmail: 'Invalid address'}} />
                                    {/* <FormFeedback>{errors.email}</FormFeedback> */}
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{ size: 5, offset: 2 }}>
                                    <div className="form-check">
                                        <Label check>
                                            <Control.checkbox model=".agree" name="agree"
                                                className="form-check-input" />
                                            {' '} <strong>May we contact you?</strong>
                                        </Label>
                                    </div>
                                </Col>
                                <Col md={{ size: 4, offset: 1 }}>
                                    <Control.select model=".contactType" name="contactType" className="form-control">
                                        <option>Telephone Number</option>
                                        <option>Email</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="message" md={2}>Your feedback</Label>
                                <Col md={10}>
                                    <Control.textarea model=".message" id="message" name="message" rows="6"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{ size: 10, offset: 2 }}>
                                    <Button type="submit" color="primary">Send feedback</Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;