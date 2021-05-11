import { useAuth } from "../../context/AuthContext";
import { useRef, useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Alert } from "../Alert";
import { Loading } from "../Loading";

const THRESHOLD = 290;

export function ForgotPassword() {
    const emRef = useRef();

    const [alertDisplay, setAlertDisplay] = useState("hidden");
    const [alertType, setAlertType] = useState("danger");
    const [alertMessage, setAlertMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const { resetPassword } = useAuth();

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
        setAlertMessage("");
        setAlertDisplay("hidden");
        // get the values of the fields
        const email = emRef.current.value;
        resetPassword(email)
            .then(() => {
                setAlertMessage("Sent, check email for further instruction");
                setAlertDisplay("visible");
                setAlertType("success");
                setLoading(false);
            })
            .catch((error) => {
                setAlertMessage(error.code);
                setAlertDisplay("visible");
                setAlertType("danger");
                setLoading(false);
            });
    }

    return (
        <Container className="panels">
            {loading ? <Loading /> : null}
            <h1 className="page-heading">Password Reset</h1>

            <Container className="d-flex">
                <Form className="from-as-wrapper" id="reset-email-form">
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

                    <div className="text-center form-padding-child">
                        {!loading ? (
                            <Button
                                variant="info"
                                className={"form-submit-button"}
                                type="submit"
                                onClick={(event) => handleSubmit(event)}
                            >
                                {windowWidth > THRESHOLD
                                    ? "Reset Password"
                                    : "Reset"}
                            </Button>
                        ) : (
                            <Button
                                variant="info"
                                disabled="disabled"
                                type="submit"
                                className={"form-submit-button disabled"}
                                onClick={(event) => handleSubmit(event)}
                            >
                                {windowWidth > THRESHOLD
                                    ? "Reset Password"
                                    : "Reset"}
                            </Button>
                        )}
                    </div>
                </Form>
            </Container>
        </Container>
    );
}
