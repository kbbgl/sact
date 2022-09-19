import React from "react";
import * as ReactDOM from "react-dom";
import "./popup.css";

const test = <img src="icon.png"></img>;

const root = document.createElement("div");
document.body.appendChild(root);

ReactDOM.render(test, root);
