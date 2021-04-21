import { Component } from "react";
import { ReactComponent as TargetImg } from "../img/target.svg";

export class Home extends Component {
    render() {
        return (
            <div id="homepage-container">
                <h2 className="chapter-head left">About this site</h2>
                <div id="homepage-intro">
                    <p class="homepage-intro-content">
                        A simple and minimalist site where you can simply control your task
                        online without wasting any paper or ink. Simple UI, easy to use.
                        Hover, click, type some characters, done. Whatever device you have, 
                        it'll always take care of your interface experience.
                        <a href="/#/dashboard" className="linkNoDecoration" style={{textDecoration: 'none'}}><button class="animated-btn">Try Now</button></a>
                    </p>
                    <TargetImg
                        class="homepage-intro-content"
                        id="targetIcon"
                        style={{width: `350px`}} />
                    
                </div>

            </div>
        )
    }
}