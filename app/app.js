console.log("Webpack");

import React from "react";
import ReactDOM from "react-dom";
//import SelectAddress from "./selectAddress";
import Container from "./container";
import "./styles/testbench.scss";

//ReactDOM.render(<Greeting name="World"/>, document.body);
//ReactDOM.render(<SelectAddress/>, document.getElementById('container'));
ReactDOM.render(<Container/>, document.getElementById('container'));