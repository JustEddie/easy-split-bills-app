import React, { Component } from "react";
import axios from "axios";

import Signup from "./auth/Signup";
import Login from "./auth/Login";
import { render } from "react-dom";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleSuccessfulAuth(data) {
    this.props.handleLogin(data);
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
          <h1>Status: {isLoggedIn}</h1>
          <button onClick={() => this.handleLogoutClick()}>Logout</button>
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
