import React from 'react'
import { Table } from 'semantic-ui-react'
import { feedDummyDataLocal as feeds } from '../../../data/feedDummyDataLocal'
import FeedsListTable from './FeedsListTable'

import './AdminFeedsListScreen.css'

const AdminFeedsListScreen = () => {
  return (
    <>
      <section id='admin-feeds-list-screen' className='admin-feeds-list-screen'>
        <h1>Feeds List</h1>

        <Table celled structured textAlign='center'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell rowSpan='2'>Feed ID</Table.HeaderCell>
              <Table.HeaderCell rowSpan='2'>Poster Name</Table.HeaderCell>
              <Table.HeaderCell rowSpan='2'>Image</Table.HeaderCell>
              <Table.HeaderCell rowSpan='2'>Posted Date</Table.HeaderCell>
              <Table.HeaderCell colSpan='2'>Misc.</Table.HeaderCell>
            </Table.Row>

            <Table.Row>
              <Table.HeaderCell>Ad?</Table.HeaderCell>
              <Table.HeaderCell>Private?</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {feeds
            .sort((a, b) => {
              return b.createdAt - a.createdAt
            })
            .map(feed => (
              <FeedsListTable key={feed.feedID} feed={feed} />
            ))}
        </Table>
      </section>
    </>
  )
}

export default AdminFeedsListScreen
