import React from 'react'
import { format } from 'date-fns'
import { Icon, Table } from 'semantic-ui-react'

const UsersListTable = ({ user }) => {
  return (
    <>
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            {user.firstName} {user.lastName}
          </Table.Cell>
          <Table.Cell>{user.displayName}</Table.Cell>
          <Table.Cell>{user.email}</Table.Cell>
          <Table.Cell>
            {format(user.createdAt, 'MMM d, yyyy h:mm a')}
          </Table.Cell>
          <Table.Cell>
            {user.isPremium && (
              <Icon color='green' name='checkmark' size='large' />
            )}
          </Table.Cell>
          <Table.Cell>
            {user.isAdmin && (
              <Icon color='green' name='checkmark' size='large' />
            )}
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </>
  )
}

export default UsersListTable
