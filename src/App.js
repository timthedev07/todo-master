import { Heading } from "./components/Heading";
import { NotFound } from "./components/404";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { Home } from "./components/Home";
import { Dashboard } from "./components/Dashboard";
import { ForgotPassword } from "./components/auth/ForgotPassword";
import "./css/master.css";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import Nav from "./components/Nav";
import { AuthProvider, useAuth } from "./context/AuthContext";

function App() {
    const { currentUser } = useAuth();

    return (
        <AuthProvider>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Heading alignment="center" />
                        <Home />
                    </Route>
                    <Route exact path="/dashboard">
                        <Nav />
                        <Dashboard />
                    </Route>
                    <Route exact path="/login">
                        <Nav />
                        {currentUser === null ? (
                            <Login />
                        ) : (
                            <Redirect to="/dashboard" />
                        )}
                    </Route>
                    <Route exact path="/register">
                        <Nav />
                        {currentUser === null ? (
                            <Register />
                        ) : (
                            <Redirect to="/dashboard" />
                        )}
                    </Route>
                    <Route exact path="/forgot-password">
                        <Nav />
                        <ForgotPassword />
                    </Route>
                    <Route component={NotFound} />
                </Switch>
            </Router>
        </AuthProvider>
    );
}

export default App;
