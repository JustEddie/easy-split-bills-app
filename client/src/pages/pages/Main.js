import React, { useEffect, useState, Component } from "react";
import axios from "axios";

class Main extends Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //         projects: []
  //     };
  //   }
  // const [projects, setProjects] = useState([]);

  state = { projects: [] };

  loadProjects = () => {
    // event.preventDefault();

    const { projects } = this.state;
    axios.get("http:localhost:3001/projects").then((response) => {
      console.log(response);
    });
    // const url = "api/v1/beers/index";
    // fetch(url)
    //   .then((data) => {
    //     if (data.ok) {
    //       return data.json();
    //     }
    //     throw new Error("Network error.");
    //   })
    //   .then((data) => {
    //     data.forEach((beer) => {
    //       const newEl = {
    //         key: beer.id,
    //         id: beer.id,
    //         brand: beer.brand,
    //         style: beer.style,
    //         country: beer.country,
    //         quantity: beer.quantity,
    //       };

    //       this.setState((prevState) => ({
    //         beers: [...prevState.beers, newEl],
    //       }));
    //     });
    //   })
    //   .catch((err) => message.error("Error: " + err));
  };
}
export default Main;
