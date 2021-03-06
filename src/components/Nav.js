import { useEffect, useState } from "react";
import { Dropdown, Button } from "react-bootstrap";
import { auth } from "../firebaseSetup";
import { useAuth } from "../context/AuthContext";
import { ReactComponent as RefreshIcon } from "../icons/refresh.svg";
const THRESHOLD = 600;

export default function Nav(props) {
    // teep track of screen size
    const [screenWidth, setScreenWidth] = useState(() => {
        return window.innerWidth;
    });
    const [currentUser, setCurrentUser] = useState();
    const [loggedIn, setLoggedIn] = useState();
    const { logout } = useAuth();

    useEffect(() => {
        function handleResize() {
            setScreenWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);
    });

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoggedIn(currentUser !== null);
        });
        return unsubscribe;
    }, [currentUser]);

    async function handleLogout() {
        await logout();
        window.location.reload();
    }

    const navBar = (
        <div className="navbar">
            <a href="/" className="navbar-item">
                <div>home</div>
            </a>
            <a href="/dashboard" className="navbar-item">
                <div>dashboard</div>
            </a>

            {loggedIn ? (
                <div onClick={handleLogout} className="navbar-item">
                    <div>logout</div>
                </div>
            ) : (
                <a href="/login" className="navbar-item">
                    <div>signin</div>
                </a>
            )}
            <Button
                onClick={() => props.forceUpdate()}
                variant="success"
                className="btn btn-success navbar-refresh"
                id="refresh-icon-container-nav-bar"
            >
                <RefreshIcon id="refresh-icon" />
            </Button>
        </div>
    );

    const dropDown = (
        <div className="navbar-flex">
            <Dropdown id="nav-dropdown">
                <Dropdown.Toggle variant="warning" id="dropdown-basic">
                    Menu
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item className="nav-dropdown-item" href="/">
                        HOME PAGE
                    </Dropdown.Item>
                    <Dropdown.Item
                        className="nav-dropdown-item"
                        href="/dashboard"
                    >
                        Dashboard
                    </Dropdown.Item>
                    {loggedIn ? (
                        <Dropdown.Item className="nav-dropdown-item" href="#">
                            Logout
                        </Dropdown.Item>
                    ) : (
                        <Dropdown.Item
                            className="nav-dropdown-item"
                            href="/login"
                        >
                            signin
                        </Dropdown.Item>
                    )}
                    <Dropdown.Item className="nav-dropdown-item">
                        <Button
                            onClick={() => props.forceUpdate()}
                            variant="success"
                            className="btn btn-success navbar-refresh"
                            id="refresh-icon-container"
                        >
                            <RefreshIcon id="refresh-icon" />
                        </Button>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );

    return screenWidth > THRESHOLD ? navBar : dropDown;
}
