import { Button, Form, Input, Modal, Select } from "antd";
import React from "react";

const { Option } = Select;

class NewProject extends React.Component {
  formRef = React.createRef();
  state = {
    visible: false,
  };

  onFinish = (values) => {
    axios
      .post(`http://localhost:3001/projects/new`)
      .then((response) => {
        // console.log(response)

        if (response.status === 200) {
          //   this.reloadProjects();
          // return response.json();
          this.handleCancel();
        } else {
          throw new Error("network error: " + response.status);
        }
      })
      .then(() => {
        this.props.reloadProjects();
      })
      .catch((error) => console.log("api errors:", error));
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
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
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
        >
          <Form>
            <Form.Item>
              <Input />
            </Form.Item>

            <Form.Item>
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
}

export default NewProject;