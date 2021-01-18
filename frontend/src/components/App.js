import React, { Component } from "react";
import { BrowserRouter } from 'react-router-dom'
import Navbar from './Navbar/Navbar';
import CssBaseline from '@material-ui/core/CssBaseline';
class App extends Component {


  render() {
    return (
    <React.Fragment>
    <CssBaseline />
      <BrowserRouter>
          <Navbar />
      </BrowserRouter>
    </React.Fragment>
    );
  }
}

export default App;

