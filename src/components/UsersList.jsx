import React, { useState , useEffect } from 'react'
import axios from 'axios'
import { Table } from 'react-bootstrap'

const UsersList = () => {


    const [users , setUsers] = useState([])


    const getUsersList = async () => {
        try {
            const response = await axios.get('http://localhost:3000/users')
            setUsers(response.data)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getUsersList()
    },[])



    console.log(users)



  return (
    <div className='users-list'>
            <h1>Users List</h1>
                   <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>FullName</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
             {
                users.map(user => (
                    <tr>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                    </tr>
                ))
            }
      </tbody>
    </Table>

    </div>
  )
}

export default UsersList