import { Component } from "react";
import { ReactComponent as TargetImg } from "../img/target.svg";

export class Home extends Component {
    render() {
        return (
            <div id="homepage-container">
                <h2 className="chapter-head left">About this site</h2>
                <div id="homepage-intro">
                    <p className="homepage-intro-content">
                        A simple and minimalist site where you can control your tasks
                        online without wasting any paper or ink. Simple UI, easy to use.
                        Hover, click, type some characters, done. Whatever device you have,
                        it'll always take care of your interface experience.
                        <a href="dashboard" className="linkNoDecoration" style={{ textDecoration: 'none' }}><button className="animated-btn">Try Now</button></a>
                    </p>
                    <TargetImg
                        className="homepage-intro-content"
                        id="targetIcon"
                        style={{ width: `350px` }} />

                </div>

            </div>
        )
    }
}