import { useRef, useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Alert } from "../Alert";
import { Redirect } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Loading } from "../Loading";
import FacebookButton from "../FacebookButton";
import GoogleButton from "../GoogleButton";

const THRESHOLD = 290;

export function Register() {
    const emRef = useRef();
    const pwRef = useRef();
    const confirmRef = useRef();

    const [alertDisplay, setAlertDisplay] = useState("hidden");
    const [alertType, setAlertType] = useState("danger");
    const [alertMessage, setAlertMessage] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [location, setLocation] = useState("");
    const [loading, setLoading] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);
    });

    const { signup, signinWithGoogle, signinWithFacebook } = useAuth();

    function routeToLogin() {
        setLocation("/login");
        setRedirect(true);
    }

    function googleSignin() {
        signinWithGoogle();
    }

    function facebookSignin() {
        signinWithFacebook();
    }

    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);
    });

    function handleSubmit(event) {
        // prevent reload
        event.preventDefault();

        setLoading(true);

        // get the values of the fields
        const email = emRef.current.value;
        const password = pwRef.current.value;
        const confirmation = confirmRef.current.value;

        if (password !== confirmation) {
            setAlertDisplay("visible");
            setAlertType("danger");
            setAlertMessage("Passwords don't match");
            setLoading(false);
            return;
        }

        setAlertMessage("");
        setAlertDisplay("hidden");
        signup(email, password)
            .then((userCredential) => {
                // Signed in
                // var user = userCredential.user;
                setLoading(false);
                setLocation("/dashboard");
                setRedirect(true);
            })
            .catch((error) => {
                // handle different types of errors
                const errorCode = error.code;
                if (errorCode === "auth/invalid-email") {
                    setAlertMessage(`Invalid email format`);
                } else if (errorCode === "auth/weak-password") {
                    setAlertMessage("Password too short");
                } else {
                    setAlertMessage(`Email already registered`);
                }
                setAlertDisplay("visible");
                setAlertType("danger");
                setLoading(false);
            });
    }

    return !redirect ? (
        <Container className="panels">
            {loading ? <Loading /> : null}
            <h1 className="page-heading">Join Us</h1>

            <Container className="d-flex">
                <div>
                    <GoogleButton
                        style={{ width: "100%" }}
                        onClick={() => googleSignin()}
                        text="Sign up with google"
                    />
                    <FacebookButton
                        text="Sign up with google"
                        handleClick={facebookSignin}
                    />
                    <Form className="from-as-wrapper" id="register-form">
                        <Alert
                            visibility={alertDisplay}
                            type={alertType}
                            message={alertMessage}
                        />
                        <div className="input-data form-padding-child">
                            <input
                                required
                                className="regular-input"
                                type="email"
                                ref={emRef}
                            />
                            <label>Email</label>
                        </div>

                        <div className="input-data form-padding-child tooltip-container">
                            <input
                                required
                                className="regular-input"
                                type="password"
                                ref={pwRef}
                            />
                            <span className="tooltiptext">
                                Password must be at least 6 characters long
                            </span>
                            <label>Password</label>
                        </div>
                        <div className="input-data form-padding-child">
                            <input
                                required
                                className="regular-input"
                                type="password"
                                ref={confirmRef}
                            />
                            <label>Confirmation</label>
                        </div>
                        <div className="text-center form-padding-child">
                            {!loading ? (
                                <Button
                                    variant="info"
                                    className={"form-submit-button"}
                                    type="submit"
                                    onClick={(event) => handleSubmit(event)}
                                >
                                    Sign up
                                </Button>
                            ) : (
                                <Button
                                    variant="info"
                                    disabled="disabled"
                                    type="submit"
                                    className={"form-submit-button disabled"}
                                    onClick={(event) => handleSubmit(event)}
                                >
                                    Sign up
                                </Button>
                            )}
                        </div>
                        <div className="text-center second-option-container">
                            <Button
                                variant="light"
                                className="form-submit-button"
                                onClick={() => routeToLogin()}
                            >
                                {windowWidth > THRESHOLD
                                    ? "Already have an account?"
                                    : "Sign in"}
                            </Button>
                        </div>
                    </Form>
                </div>
            </Container>
        </Container>
    ) : (
        <Redirect to={location} />
    );
}
