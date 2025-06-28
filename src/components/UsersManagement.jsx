import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Table, Button, Space, Modal, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";

export const UsersManagement = () => {
  //modal logic

  const [isModalOpen, setIsModalOpen] = useState(false); // for add a new user
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false); // for edit an existing user

  const showModal = () => {
    setIsModalOpen(true);
  };

  const showModalUpdating = (user) => {
    setEditingUser(user);
    setEmail(user.email);
    setName(user.name);
    setAddress(user.address);
    setIsModalOpenEdit(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setEmail("");
    setName("");
    setAddress("");
    setEditingUser(null);
  };
  const handleCancelEdit = () => {
    setIsModalOpenEdit(false);
    setEmail("");
    setName("");
    setAddress("");
    setEditingUser(null);
  };

  // Users List array
  const [users, setUsers] = useState([]);

  // Get users List
  const getUsersList = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users");
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsersList();
  }, []);

  // Logic to create a new user
  const [editingUser, setEditingUser] = useState(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const addUser = async (e) => {
    e.preventDefault();
    let data = {
      name,
      email,
      address,
    };
    try {
      const response = await axios.post("http://localhost:3000/users", data);
      if (response.status === 201) {
        toast.success("User Created Successfully");
        localStorage.setItem("user", JSON.stringify(data));
        handleCancel();
      }
    } catch (error) {
      toast.error("Error when trying to add a new user");
    }
  };

  const editUser = async (e) => {
    e.preventDefault();
    let data = {
      name,
      email,
      address,
    };
    try {
      const response = await axios.put(
        `http://localhost:3000/users/${editingUser.id}`,
        data
      );
      if (response.data) {
        toast.success("User Updated Successfully");
        handleCancel();
      }
    } catch (error) {
      toast.error("Error when trying to update a new user");
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm("Are you want to delete this user")) {
      try {
        const response = await axios.delete(
          `http://localhost:3000/users/${id}`
        );
        if (response.status === 200) {
          toast.success("User deleted successfully");
        }
      } catch (error) {
        toast.error("Unable to delete user");
      }
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => showModalUpdating(record)}>Edit</Button>
          <Button danger onClick={() => deleteUser(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="p-14">
        <div className="flex justify-between items-center py-6">
          <h1 className="text-3xl font-semibold">Users management</h1>
          <Button icon={<PlusOutlined />} onClick={showModal}>
            Add User
          </Button>
        </div>
        <Table columns={columns} dataSource={users} />
        {/* Modal component */}
      </div>
      {/* Add User */}
      <Modal
        title={"Add User"}
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={addUser}
        onCancel={handleCancel}
        okText={"Create"}
      >
        <h4>Name : </h4>
        <Input
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <h4>Email : </h4>
        <Input
          placeholder="Enter your email"
          value={email}
          style={{ margin: "10px 0px" }}
          onChange={(e) => setEmail(e.target.value)}
        />
        <h4>Address : </h4>
        <Input
          placeholder="Enter your address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </Modal>
      {/* Edit User */}
      <Modal
        title={"Edit User"}
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpenEdit}
        onOk={editUser}
        onCancel={handleCancelEdit}
        okText={"Update"}
      >
        <h4>Name : </h4>
        <Input
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <h4>Email : </h4>
        <Input
          placeholder="Enter your email"
          value={email}
          style={{ margin: "10px 0px" }}
          onChange={(e) => setEmail(e.target.value)}
        />
        <h4>Address : </h4>
        <Input
          placeholder="Enter your address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </Modal>
    </>
  );
};
