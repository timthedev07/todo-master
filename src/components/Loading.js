import React from "react";
import { ReactComponent as SpinnerIcon } from "../icons/spinner.svg";

export function Loading() {
    return (
        <div id="loading">
            <SpinnerIcon id="loading-spinner" />
        </div>
    );
}
