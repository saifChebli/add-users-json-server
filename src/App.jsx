import React from 'react'
import UsersList from './components/UsersList'
import AddUser from './components/AddUser'

const App = () => {
  return (
    <div className='app'>
       <h1>Demo With JSON-SERVER</h1>

       <UsersList />

       <AddUser />
    </div>
  )
}

export default App