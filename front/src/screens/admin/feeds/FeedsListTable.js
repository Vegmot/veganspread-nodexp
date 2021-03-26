import React from 'react'
import { Table, Icon, Image } from 'semantic-ui-react'
import { format } from 'date-fns'

const FeedsListTable = ({ feed }) => {
  return (
    <>
      <Table.Body>
        <Table.Row>
          <Table.Cell>{feed.feedID}</Table.Cell>
          <Table.Cell>{feed.displayName}</Table.Cell>
          <Table.Cell>
            <Image
              centered
              size='tiny'
              src={feed.image}
              alt={`Image uploaded by ${feed.displayName} for feedID ${feed.feedID}`}
            />
          </Table.Cell>
          <Table.Cell>
            {format(feed.createdAt, 'MMM d, yyyy h:mm a')}
          </Table.Cell>
          <Table.Cell>
            {feed.isAd && <Icon color='green' name='checkmark' size='large' />}
          </Table.Cell>
          <Table.Cell>
            {feed.isPrivate && (
              <Icon color='green' name='checkmark' size='large' />
            )}
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </>
  )
}

export default FeedsListTable
