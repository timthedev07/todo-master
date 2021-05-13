import { useRef, useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Alert } from "../Alert";
import { Redirect, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Loading } from "../Loading";
import FacebookButton from "../FacebookButton";
import GoogleButton from "../GoogleButton";

const THRESHOLD = 290;

export function Login() {
    const emRef = useRef();
    const pwRef = useRef();

    const [alertDisplay, setAlertDisplay] = useState("hidden");
    const [alertType, setAlertType] = useState("danger");
    const [alertMessage, setAlertMessage] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [location, setLocation] = useState("");
    const [loading, setLoading] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const { login } = useAuth();

    function routeToRegister() {
        setLocation("/register");
        setRedirect(true);
    }

    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);
    });

    async function handleSubmit(event) {
        // prevent reload
        event.preventDefault();

        setLoading(true);

        // get the values of the fields
        const email = emRef.current.value;
        const password = pwRef.current.value;

        await setAlertMessage("");
        await setAlertDisplay("hidden");
        await login(email, password)
            .then((userCredential) => {
                // Signed in
                // var user = userCredential.user;
                setLoading(false);
                setLocation("/dashboard");
                setRedirect(true);
            })
            .catch((error) => {
                setAlertMessage("Invalid email/password");
                setAlertDisplay("visible");
                setAlertType("danger");
                setLoading(false);
            });
    }

    return !redirect ? (
        <Container className="panels">
            {loading ? <Loading /> : null}
            <h1 className="page-heading">Welcome Back</h1>

            <Container className="d-flex">
                <div>
                    <GoogleButton style={{ width: "100%" }} />

                    <FacebookButton />

                    <Form className="from-as-wrapper">
                        <Alert
                            visibility={alertDisplay}
                            type={alertType}
                            message={alertMessage}
                        />
                        <div className="input-data form-padding-child">
                            <span className="field-hint-icon"></span>
                            <input
                                required
                                className="regular-input"
                                type="email"
                                ref={emRef}
                            />
                            <label>Email</label>
                        </div>
                        <div className="input-data form-padding-child">
                            <input
                                required
                                className="regular-input"
                                type="password"
                                ref={pwRef}
                            />
                            <label>Password</label>
                        </div>
                        <div className="text-center form-padding-child">
                            {!loading ? (
                                <Button
                                    variant="info"
                                    className={"form-submit-button"}
                                    type="submit"
                                    onClick={(event) => handleSubmit(event)}
                                >
                                    Sign in
                                </Button>
                            ) : (
                                <Button
                                    variant="info"
                                    disabled="disabled"
                                    type="submit"
                                    className={"form-submit-button disabled"}
                                    onClick={(event) => handleSubmit(event)}
                                >
                                    Sign in
                                </Button>
                            )}
                            <Link to="/forgot-password">
                                <Button className="normal-links" variant="link">
                                    {windowWidth > THRESHOLD
                                        ? "Forgot your password?"
                                        : "Reset Password"}
                                </Button>
                            </Link>
                        </div>
                        <div className="text-center second-option-container">
                            <Button
                                variant="light"
                                className="form-submit-button"
                                onClick={() => routeToRegister()}
                            >
                                {windowWidth > THRESHOLD
                                    ? "Not a member yet?"
                                    : "Join"}
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
