// Just a playground for now

import React from 'react'
import { userDummyDataLocal as users } from '../../../data/userDummyDataLocal'
import UsersListTable from './UsersListTable'
import { Table } from 'semantic-ui-react'

import './AdminUsersListScreen.css'

const AdminUsersListScreen = () => {
  return (
    <>
      <section id='admin-users-list-screen' className='admin-users-list-screen'>
        <h1>Users List</h1>

        <Table celled structured textAlign='center'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell rowSpan='2'>Name</Table.HeaderCell>
              <Table.HeaderCell rowSpan='2'>Display Name</Table.HeaderCell>
              <Table.HeaderCell rowSpan='2'>Email</Table.HeaderCell>
              <Table.HeaderCell rowSpan='2'>Member Since</Table.HeaderCell>
              <Table.HeaderCell colSpan='2'>Misc.</Table.HeaderCell>
            </Table.Row>

            <Table.Row>
              <Table.HeaderCell>Premium?</Table.HeaderCell>
              <Table.HeaderCell>Admin?</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {users
            .sort((a, b) => {
              return b.createdAt - a.createdAt
            })
            .map(user => (
              <UsersListTable key={user.userID} user={user} />
            ))}
        </Table>
      </section>
    </>
  )
}

export default AdminUsersListScreen
