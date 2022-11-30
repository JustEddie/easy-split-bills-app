import { Button, Form, Input, Modal, Select } from "antd";
import React from "react";
import axios from "axios";
import NewMember from "./NewMember";
import Member from "./Members";

// const { Option } = Select;

class NewProject extends React.Component {
  formRef = React.createRef();
  state = {
    open: false,
  };

  
  onProjectFormFinish = (values) => {
    let project = {
      title: values.title,
    };

    axios
      .post(
        `http://localhost:3001/projects`,
        { project },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.status === 200) {
          this.props.reloadProjects();
          this.handleCancel();
        } else {
          throw new Error("network error: " + response.status);
        }
      })
      .catch((error) => console.log("api errors:", error));
  };

  onMemberFormFinish = (values) => {
    let member = {
      member_name: values.member_name,
    };
    let bill = {};
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
            <NewMember />

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
