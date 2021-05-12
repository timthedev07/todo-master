import React from "react";
import { ReactComponent as FacebookIcon } from "../icons/facebook.svg";
export default function FacebookButton(props) {
    return (
        <div
            onClick={props.handleClick}
            type="dark"
            tabIndex={0}
            role="button"
            style={{
                marginTop: "10px",
                marginBottom: "10px",
                backgroundColor: "rgb(66, 133, 244)",
                color: "rgb(255, 255, 255)",
                height: "50px",
                width: "100%",
                border: "medium none",
                textAlign: "center",
                boxShadow: "rgba(0, 0, 0, 0.25) 0px 2px 4px 0px",
                fontSize: "16px",
                lineHeight: "48px",
                display: "block",
                borderRadius: "1px",
                transition:
                    "background-color 0.218s ease 0s, border-color 0.218s ease 0s, box-shadow 0.218s ease 0s",
                fontFamily: "Roboto, arial, sans-serif",
                cursor: "pointer",
                userSelect: "none",
            }}
        >
            <div
                style={{
                    width: "48px",
                    height: "48px",
                    textAlign: "center",
                    display: "block",
                    marginTop: "1px",
                    marginLeft: "1px",
                    float: "left",
                    backgroundColor: "rgb(255, 255, 255)",
                    borderRadius: "1px",
                    whiteSpace: "nowrap",
                }}
            >
                <FacebookIcon style={{ width: "25px" }} />
            </div>
            <span> {props.text || "Sign in with Facebook"}</span>
        </div>
    );
}
