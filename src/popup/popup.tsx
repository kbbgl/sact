import * as React from "react";
import * as ReactDOM from "react-dom";
import "./popup.css";

const App: React.FC<{}> = () => {
  return (
    <div>
      <h2>Under construction...</h2>
      <img src="icon.png"></img>
    </div>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);

ReactDOM.render(<App />, root);
