import React from 'react'
import { Table } from 'semantic-ui-react'
import { commentDummyDataLocal as comments } from '../../../data/commentDummyDataLocal'
import CommentsListTable from './CommentsListTable'

import './AdminCommentsListScreen.css'

const AdminCommentsListScreen = () => {
  return (
    <>
      <section
        id='admin-comments-list-screen'
        className='admin-comments-list-screen'
      >
        <h1>Comments List</h1>

        <Table fixed textAlign='center'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Comment ID</Table.HeaderCell>
              <Table.HeaderCell>Poster ID</Table.HeaderCell>
              <Table.HeaderCell>Feed ID</Table.HeaderCell>
              <Table.HeaderCell>Posted Date</Table.HeaderCell>
              <Table.HeaderCell>Contents</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {comments
            .sort((a, b) => {
              return b.createdAt - a.createdAt
            })
            .map(comment => (
              <CommentsListTable key={comment.commentID} comment={comment} />
            ))}
        </Table>
      </section>
    </>
  )
}

export default AdminCommentsListScreen
