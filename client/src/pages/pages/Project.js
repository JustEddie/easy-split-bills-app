import axios from "axios";
import React from "react";
import { Table } from "antd";

// project page shows members and bills , needs to be able to edit, and add more members and bills

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
    };
  }
  columns = [
    {
      member_name: "Name",
      dataIndex: "name",
      key: "name",
    },
  ];

  componentDidMount() {
    this.loadProjectPage(this.props.project_id);
  }

  // get members for this project_id
  loadProjectPage = (project_id) => {
    axios
      .get(`http://localhost:3001/members`, {
        withCredentials: true,
      })
      .then((response) => {
        response.data.members.forEach((member) => {
          if (member.project_id === project_id) {
            const newElement = {
              key: member.id,
              id: member.id,
              name: member.member_name,
            };
            this.setState((prevState) => ({
              members: [...prevState.members, newElement],
            }));
          }
        });
      })
      .catch((error) => console.log(error));
  };

  reloadProjectPage = () => {
    this.setState({ members: [] });
    this.loadProjectPage();
  };
  // add delete members function and delete bills function
  // add edit members function and edit bills function

  render() {
    return (
      <div>
        <Table
          className="table-striped-rows"
          dataSource={this.state.members}
          columns={this.columns}
          pagination={{ pageSize: 10 }}
        />
      </div>
    );
  }
}

export default Project;
