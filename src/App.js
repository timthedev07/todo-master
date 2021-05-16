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
// importing contexts
import { AuthProvider, useAuth } from "./context/AuthContext";
import { TaskManager } from "./context/TasksContext";

function App() {
    const { currentUser } = useAuth();

    return (
        <AuthProvider>
            <TaskManager>
                <Router>
                    <Switch>
                        {/* Main ones */}
                        <Route exact path="/">
                            {!currentUser ? null : <Nav />}
                            <Heading alignment="center" />
                            <Home />
                        </Route>
                        <Route exact path="/dashboard">
                            <Dashboard />
                        </Route>

                        {/* Auth */}
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

                        {/* 404 */}
                        <Route component={NotFound} />

                        {/* Avoid possible wrong routes */}
                        <Route exact path="/signup">
                            <Redirect to="/register" />
                        </Route>
                        <Route exact path="/signup">
                            <Redirect to="/register" />
                        </Route>
                    </Switch>
                </Router>
            </TaskManager>
        </AuthProvider>
    );
}

export default App;
