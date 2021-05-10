import { useEffect, useState } from 'react';
import { Dropdown } from "react-bootstrap";

export default function Nav() {

    // teep track of screen size
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        function handleResize() {
            setScreenWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize);
    });

    const navBar = (
        <div className="navbar">
            <a href="/" className="navbar-item">
                <div>
                    home
                </div>
            </a>
            <a href="/dashboard" className="navbar-item">
                <div>
                    dashboard
                </div>
            </a>
            <a href="/logout" className="navbar-item">
                <div>
                    logout
                </div>
            </a>
        </div>
    );

    const dropDown = (
        <div className="navbar-flex">
            <Dropdown>
                <Dropdown.Toggle variant="warning" id="dropdown-basic">
                    Menu
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item className="nav-dropdown-item" href="/">HOME PAGE</Dropdown.Item>
                    <Dropdown.Item className="nav-dropdown-item" href="/dashboard">Dashboard</Dropdown.Item>
                    <Dropdown.Item className="nav-dropdown-item" href="#">Logout</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )

    return screenWidth > 420 ? navBar : dropDown;

}
