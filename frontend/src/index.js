import React from 'react'
import App from "./components/App";
import { BrowserRouter } from 'react-router-dom'
import ReactDom from "react-dom";

ReactDom.render(
    <React.StrictMode>
    <App/>
    </React.StrictMode>,
    document.getElementById('app')
);
