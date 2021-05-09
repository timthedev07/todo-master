import { Component } from "react";
import { Heading } from "./components/Heading";
import { NotFound } from "./components/404";
import { Home } from "./components/Home";
import { Dashboard } from "./components/Dashboard";
import "./css/master.css";
import {
    HashRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';


var firebaseConfig = {
    apiKey: "AIzaSyCihFqVclU-LSPGfTtVxfj-iOifI7_088s",
    authDomain: "todo-dominus.firebaseapp.com",
    projectId: "todo-dominus",
    storageBucket: "todo-dominus.appspot.com",
    messagingSenderId: "20595187474",
    appId: "1:20595187474:web:102775cefbcc23febbddcb",
    measurementId: "G-P8PDFZRV41"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();


class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Heading alignment="center" />
                        <Home />
                    </Route>
                    <Route exact path="/dashboard">
                        <Heading alignment="left" />
                        <Dashboard />
                    </Route>
                    <Route component={NotFound} />
                </Switch>
            </Router>
        );
    }
}

export default App;
