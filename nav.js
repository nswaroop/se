import React, { Component } from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import './nav.css'
class NavbarPage extends Component {
state = {
  isOpen: false
};

toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}

render() {
  return (
<nav class="navbar" style={{'marginTop':'10px'}}>
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="#">Invigilation Management</a>
    </div>
   
       <a className="a1" href="/">Home</a>
      <a className="a2" href="/about">About us</a>
      <a className="a2" href="/login"><span class="glyphicon glyphicon-user"></span>Login </a>
     
  
  </div>
</nav> 
    );
  }
}

export default NavbarPage;