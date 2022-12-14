import React, { Component } from "react";
import axios from "axios";

import Signup from "./auth/Signup";
import Login from "./auth/Login";
import Main from "./pages/Main";
export default class Home extends Component {
  constructor(props) {
    super(props);

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleSuccessfulAuth(data) {
    this.props.handleLogin(data);
    console.log("insideSuccessfulAuth")
  }

  handleLogoutClick() {
    axios
      .delete("http://localhost:3001/logout", { withCredentials: true })
      .then((response) => {
        this.props.handleLogout();
      })
      .catch((error) => {
        console.log("logout error", error);
      });
  }

  render() {
    const isLoggedIn = this.props.isLoggedIn;

    if (isLoggedIn) {
      return (
        <div>
          <h1>Home</h1>
          <h1>Logged in as: {this.props.isLoggedIn}</h1>
          <button onClick={() => this.handleLogoutClick()}>Logout</button>
          <Main  />
        </div>
      );
    } else
      return (
        <div>
          <Signup handleSuccessfulAuth={this.handleSuccessfulAuth} />
          <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
        </div>
      );
  }
}
