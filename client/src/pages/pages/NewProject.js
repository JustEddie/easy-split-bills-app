import { Button, Form, Input, Modal, Select } from "antd";
import React from "react";
import axios from "axios";

// const { Option } = Select;

class NewProject extends React.Component {
  formRef = React.createRef();
  state = {
    open: false,
  };

  onFinish = (values) => {
    let project = { title: values.title}
    axios
      .post(`http://localhost:3001/projects`, {project}, {withCredentials: true})
      .then((response) => {
        console.log(response)

        // if (response.status === 'created') {
        //     this.reloadProjects();
        //   // return response.json();
        //   this.handleCancel();
        // } else {
        //   throw new Error("network error: " + response.status);
        // }
      })
      .then(() => {
        this.props.reloadProjects();
      })
      .catch((error) => console.log("api errors:", error));
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
          <Form ref={this.formRef} onFinish={this.onFinish}>
            <Form.Item name="title" label="Title">
              <Input placeholder="title" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
            {/* <Form.Item>
              <Input />
            </Form.Item> */}
          </Form>

          {/* <Form>
            <Form.Item>
              <Input />
            </Form.Item>

            <Form.Item>
              <Input />
            </Form.Item>
          </Form> */}
        </Modal>
      </>
    );
  }
}

export default NewProject;