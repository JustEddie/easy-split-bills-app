import { Button, Form, Input, Modal, Select } from "antd";
import React from "react";
import axios from "axios";
import NewMember from "./NewMember";
import Member from "./Member";

// const { Option } = Select;

class NewProject extends React.Component {
  formRef = React.createRef();
  state = {
    open: false,
    members: [],
    projectId: "",
  };

  onProjectFormFinish = (values) => {
    let project = {
      title: values.title,
    };
    // let member = {
    //   member_name: values.member_name,
    // }
    // response.data.project.id

    axios
      .post(
        `http://localhost:3001/projects`,
        { project },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.status === 200) {
          this.props.reloadProjects();
          this.setState({members: []});
          this.handleCancel();
          this.setState.projectId = `${response.data.project.id}`;
        } else {
          throw new Error("network error: " + response.status);
        }
      })
      .catch((error) => console.log("api errors:", error));
  };

  loadMembers = () => {
    console.log(this.state.members);
  };

  showModal = () => {
    this.setState({
      open: true,
    });
  };

  handleCancel = () => {
    this.setState({
      open: false,
    });
  };
  // loadMembers = () => {
  //   axios
  //     .get("http://localhost:3001/members/", { withCredentials: true })
  //     .then((response) => {
  //       if (response.data.members.project_id === this.state.projectId) {
  //         response.data.members.forEach((member) => {
  //           const newElement = {
  //             key: member.id,
  //             id: member.id,
  //             title: member.title,
  //             //     //   userName: member.user.username,
  //             //       userId: member.user_id,
  //           };
  //           //   response.data.members
  //           this.setState((prevState) => ({
  //             members: [...prevState.members, newElement],
  //           }));
  //         });
  //         // console.log(response.data.members);
  //       } else {
  //         console.log("no member found");
  //       }
  //     })
  //     .catch((error) => console.log("api errors:", error));
  // };
  // reloadMembers = () => {
  //   this.setState({ members: [] });
  //   this.loadMembers();
  // }

  render() {
    return (
      <>
        <Button type="primary" onClick={this.showModal}>
          Create New Project
        </Button>

        <Modal
          title="Add New Project ..."
          open={this.state.open}
          onCancel={this.handleCancel}
          footer={null}
        >
          <Form ref={this.formRef} onFinish={this.onProjectFormFinish}>
            <Form.Item name="title" label="Title">
              <Input placeholder="title" />
            </Form.Item>
            <NewMember
              // projectId={this.projectId}
              // onFinish={this.onProjectFormFinish}
              loadMembers={this.loadMembers}
              memberState={this.state.members}
            />

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
          <Member />
        </Modal>
      </>
    );
  }
}

export default NewProject;
