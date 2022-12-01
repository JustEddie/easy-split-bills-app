import React, { useEffect, useState, Component } from "react";
import axios from "axios";
import { Table, message, Popconfirm } from "antd";
import NewProject from "./NewProject";
import Project from "./Project";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
    };
  }
  columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "",
      key: "action",
      render: (_text,record) =>(
        <Project project_id={record.id}/>
      )
    },
    {
      title: "",
      key: "action",
      render: (_text, record) => (
        <Popconfirm
          title="Are you sure to delete this project?"
          onConfirm={() => this.deleteProject(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <a href="#" type="danger">
            Delete{" "}
          </a>
        </Popconfirm>
      ),
    },
  ];

  //   const
  //   state = { projects: [] };

  componentDidMount() {
    this.loadProjects();
  }

  loadProjects = () => {
    axios
      .get("http://localhost:3001/projects/", { withCredentials: true })
      .then((response) => {
        if (response.data.projects) {
          response.data.projects.forEach((project) => {
            const newElement = {
              key: project.id,
              id: project.id,
              title: project.title,
              //     //   userName: project.user.username,
              //       userId: project.user_id,
            };
            //   response.data.projects
            this.setState((prevState) => ({
              projects: [...prevState.projects, newElement],
            }));
          });
          // console.log(response.data.projects);
        } else {
          console.log("no project found");
        }
      })
      .catch((error) => console.log("api errors:", error));
  };

  reloadProjects = () => {
    this.setState({ projects: [] });
    this.loadProjects();
  }
  deleteProject = (id) => {

    axios
    .delete(`http://localhost:3001/projects/${id}`)
    .then((response) =>{
        // console.log(response)
        if(response.status === 200) {
          this.reloadProjects();
          // return response.json();
        } else {
          throw new Error("network error: " + response.status)
        }})
    .catch((error) => console.log("api errors:", error));
  }

  render() {
    return (
      <div>
        <Table
          className="table-striped-rows"
          dataSource={this.state.projects}
          columns={this.columns}
          pagination={{ pageSize: 10 }}
        />
        <NewProject reloadProjects={this.reloadProjects} />
      </div>
    );
  }
}
export default Main;
