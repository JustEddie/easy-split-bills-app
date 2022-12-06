import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: {},
    };
  }
  componentDidMount() {
    this.loginStatus();
    console.log("componentDidMount")
  }
  loginStatus = () => {
    axios
      .get("http://localhost:3001/logged_in", { withCredentials: true })
      .then((response) => {
        if (response.data.logged_in) {
          this.handleLogin(response.data);
        } else {
          this.handleLogout();
        }
      })
      .catch((error) => console.log("api errors:", error));
  };
  handleLogin = (data) => {
    this.setState({
      isLoggedIn: true,
      user: data.user,
    });
  };
  handleLogout = () => {
    this.setState({
      isLoggedIn: false,
      user: {},
    });
  };

  render() {
    return (
      <div>
        <BrowserRouter>
          <Link className="link" to={"/"}>
            <h1 className="logo">Easy Split Bills App</h1>
          </Link>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Home
                  handleLogin={this.handleLogin}
                  handleLogout={this.handleLogout}
                  isLoggedIn={this.state.isLoggedIn}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
