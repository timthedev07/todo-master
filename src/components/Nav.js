import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { auth } from "../firebaseSetup";
import { useAuth } from "../context/AuthContext";
const THRESHOLD = 520;

export default function Nav() {
    // teep track of screen size
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
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

    function handleLogout() {
        logout();
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
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );

    return screenWidth > THRESHOLD ? navBar : dropDown;
}
