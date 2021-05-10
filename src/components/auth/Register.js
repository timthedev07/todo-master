import { Component, createRef } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Alert } from "../Alert";
import { Redirect } from 'react-router-dom';


export class Register extends Component {
    constructor(props) {
        super(props);
        this.unRef = createRef();
        this.pwRef = createRef();
        this.confirmRef = createRef();
        this.state = {
            apiResponse: null,
            alertDisplay: 'none',
            alertType: 'danger',
            alertMessage: '',
            redirect: false,
            window_width: window.innerWidth,
            location: '',
        };
        window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);

    }

    routeToLogin = () => {
        this.setState({
            redirect: true,
            location: '/login'
        });
    }



    handleSubmit = (event) => {
        // prevent reload
        event.preventDefault();

        // get the values of the fields
        const username = this.unRef.current.value;
        const password = this.pwRef.current.value;
        const confirmation = this.confirmRef.current.value;

        // create option 
        const options = {
            username: username,
            password: password,
            confirmation: confirmation,
        };
        console.log(options);

        this.setState({
            redirect: true,
            location: '/dashboard'
        });
    }

    render() {
        return !this.state.redirect ? (
            <Container className="panels">
                <h1 className="page-heading">Join us</h1>
                <Alert display={this.state.alertDisplay} type={this.state.alertType} message={this.state.alertMessage} />
                <Container className="d-flex">

                    <Form className="from-as-wrapper">
                        <div className="input-data form-padding-child">
                            <span className="field-hint-icon"></span>
                            <input required className="regular-input" type="text" ref={this.unRef} />
                            <label>Username</label>
                        </div>
                        <div className="input-data form-padding-child">
                            <input required className="regular-input" type="password" ref={this.pwRef} />
                            <label>Password</label>
                        </div>
                        <div className="text-center form-padding-child">
                            <Button variant="info"
                                className="form-submit-button"
                                onClick={(event) => this.handleSubmit(event)}> Sign in
                            </Button>
                        </div>
                        <div className="text-center second-option-container">
                            <Button variant="light"
                                className="form-submit-button"
                                onClick={() => this.routeToLogin()}>
                                Not a member yet?
                            </Button>
                        </div>
                    </Form>

                </Container >
            </Container >
        ) : (
            <Redirect to={this.state.location} />
        )
    }
}