import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from 'axios'
import toast from "react-hot-toast";


const AddUser = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const addUser = async (e) => {
    e.preventDefault()
    let data = {
        name,
        email
    }
    try {
        const response = await axios.post('http://localhost:3000/users' , data)
        if(response.status === 201){
          toast.success('User Created Successfully')
          localStorage.setItem('user' , JSON.stringify(data))
        }
    } catch (error) {
        toast.error('Error when trying to add a new user')
    }
  };

  return (
    <div className="add-user">
      <h1>Create New User</h1>

      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>FullName</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name ..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={(e) => addUser(e)}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddUser;
