import { Button, Form, Input, Modal, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import React from "react";
import axios from "axios";
import NewMember from "./NewMember";
import Member from "./Member";

// idea : new project form has new members inputs with new bills inputs
// project create controller has members create with project id and bills create with member id
// buttons to add new members input and delete new members
// seperate new members in another page

class NewProject extends React.Component {
  formRef = React.createRef();
  state = {
    open: false,
    members: [],
    bills: [],
    projectId: "",
  };

  onProjectFormFinish = (values) => {
    let project = {
      title: values.title,
    };

    // let member = this.state.members.forEach((member) => {member})

    // let member = {
    //   member_name: values.member_name,
    // }
    // response.data.project.id

    values.members.map(
      (element) => {
        this.setState((prevState) => ({
          members : [...prevState.members],
          element,
        }));
      },
      () => {
        console.log(this.state);
      }
    );

    axios
      .post(
        `http://localhost:3001/projects`,
        { project },
        // { member },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.status === 200) {
          //trying to put members in this.state.members
          // let mems = [];
          // values.members.forEach(element => {
          //   mems.push(element.member);
          // });
          // mems.forEach(element => {
          // this.setState(prevState => ({members: [...prevState.members],element}), () => {
          //   // console.log(mems)
          //   console.log(this.state.members)
          // })});

          this.setState({ projectId: `${response.data.project.id}` }, () => {
            console.log(this.state);
          });

          // console.log(response.data.project.id);
          this.props.reloadProjects();
          this.setState({ members: [] });
          this.handleCancel();
        } else {
          throw new Error("network error: " + response.status);
        }
      })
      .catch((error) => console.log("api errors:", error));
  };

  // loadMembers = () => {
  //   console.log(this.state.members);
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

            <Form.List name="members" initialValue={this.state.members}>
              {(memberFields, { add, remove }) => (
                <>
                  {memberFields.map((memberField) => (
                    <Space
                      key={memberField.key}
                      style={{ display: "flex", marginBottom: 8 }}
                      align="baseline"
                    >
                      <Form.Item
                        {...memberField}
                        name={[memberField.name, "member"]}
                      >
                        <Input placeholder="new member" />
                      </Form.Item>
                      <Form.List
                        name={[memberField.name, "bills"]}
                        initialValue={this.state.bills}
                      >
                        {(billFields, { add, remove }) => (
                          <>
                            {billFields.map((billField) => (
                              <Space
                                key={billField.key}
                                style={{ display: "flex", marginBottom: 3 }}
                                align="baseline"
                              >
                                <Form.Item
                                  {...billField}
                                  name={[billField.name, "bill"]}
                                >
                                  <Input placeholder="add bill" />
                                </Form.Item>
                                <MinusCircleOutlined
                                  onClick={() => remove(billField.name)}
                                />
                              </Space>
                            ))}
                            <Form.Item>
                              <Button
                                type="dashed"
                                onClick={add}
                                block
                                icon={<PlusOutlined />}
                              >
                                Add bill
                              </Button>
                            </Form.Item>
                          </>
                        )}
                      </Form.List>
                      <MinusCircleOutlined
                        onClick={() => remove(memberField.name)}
                      />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={add}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add member
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>

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

export default NewProject;
