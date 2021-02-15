import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Navbar from './Navbar/Navbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Home from './Home/Home'
import Browse from './Browse/Browse'
import Detail from './Detail/Detail'
class App extends Component {


  render() {
    return (
    <BrowserRouter>
    <React.Fragment>
    <CssBaseline />
      <Navbar />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/browse' exact component={Browse} />
        <Route path='/detail' exact component={Detail} />
      </Switch>   
    </React.Fragment>
    </BrowserRouter>
    );
  }
}

export default App;

