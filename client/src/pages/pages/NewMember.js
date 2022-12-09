import { Button, Form, Input, Modal, Select } from "antd";
import React from "react";
import axios from "axios";



class NewMember extends React.Component {
  formRef = React.createRef();
  state = {
    open: false,
  };

  // onMemberFormFinish = (values) => {
  //   let member = {
  //     member_name: values.member_name,
  //     project_id: this.props.projectId,
  onMemberFormFinish = (values) => {
    let member = {
      member_name: values.member_name,
    };
    this.props.memberState.push(member);
    // this.state.members.push(member);
    this.props.loadMembers();
  };
  //   };

  //   axios
  //   .post('http://localhost:3001/members',{ member }, {withCredentials: true})
  //   .then((response) => {
  //       if (response.status === 200) {
  //           this.props.reloadMembers();
  //           this.handleCancel();
  //       }
  //   })
  // };

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
          Add New Member
        </Button>

        <Modal
          title="Add New Member ..."
          open={this.state.open}
          onCancel={this.handleCancel}
          footer={null}
        >
          <Form ref={this.formRef} onFinish={this.onMemberFormFinish}>
            <Form.Item name="member_name" label="Name">
              <Input placeholder="name" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
}

export default NewMember;
