// import React from 'react';
// import {Link} from 'react-router-dom'
// const Home = () => {
//   return (
//     <div>
//       <Link to='/login'>Log In</Link>
//       <br></br>
//       <Link to='/signup'>Sign Up</Link>
//       <br></br>
//       <button onClick={() => this.handleLogoutClick()}>Logout</button>
      
//     </div>
//   );
// };
// export default Home;



import React, { Component } from "react";
import axios from "axios";

import Signup from "./auth/Signup";
import Login from "./auth/Login";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleSuccessfulAuth(data) {
    this.props.handleLogin(data);
    // this.props.history.push("/dashboard");
  }

  handleLogoutClick() {
    axios
      .delete("http://localhost:3001/logout", { withCredentials: true })
      .then(response => {
        this.props.handleLogout();
      })
      .catch(error => {
        console.log("logout error", error);
      });
  }

  render() {
    return (
      <div>
        <h1>Home</h1>
        <h1>Status: {this.props.loginStatus}</h1>
        <button onClick={() => this.handleLogoutClick()}>Logout</button>
        <Signup handleSuccessfulAuth={this.handleSuccessfulAuth} />
        <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
      </div>
    );
  }
}