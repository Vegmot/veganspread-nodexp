import { format } from 'date-fns'
import React from 'react'
import { Table } from 'semantic-ui-react'

const CommentsListTable = ({ comment }) => {
  return (
    <>
      <Table.Body>
        <Table.Row>
          <Table.Cell>{comment.commentID}</Table.Cell>
          <Table.Cell>{comment.userID}</Table.Cell>
          <Table.Cell>{comment.feedID}</Table.Cell>
          <Table.Cell>
            {format(comment.createdAt, 'MMM d, yyyy h:mm a')}
          </Table.Cell>
          <Table.Cell>{comment.text.substring(0, 100) + '...'}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </>
  )
}

export default CommentsListTable
