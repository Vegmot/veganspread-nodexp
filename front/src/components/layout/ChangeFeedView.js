import React from 'react'
import { Icon, Dropdown } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'

import styles from './ChangeFeedView.module.css'

const ChangeFeedView = ({
  cardActiveColour,
  listActiveColour,
  displayPublicPosts,
  displayMyPosts,
  cardViewHandler,
  listViewHandler,
}) => {
  const dispatch = useDispatch()

  const loginUser = useSelector(state => state.loginUser)
  const { userData } = loginUser

  return (
    <>
      <div className={styles['feeds-change-view']}>
        <Icon
          name='th'
          color={cardActiveColour}
          size='large'
          onClick={cardViewHandler}
        />
        <Icon
          name='th list'
          color={listActiveColour}
          size='large'
          onClick={listViewHandler}
        />

        <Dropdown
          icon='filter large'
          className={styles['feeds-filter-dropdown']}
        >
          <Dropdown.Menu>
            <Dropdown.Item
              icon='globe'
              text='All posts'
              onClick={() => displayPublicPosts()}
            />
            <Dropdown.Item
              icon='write'
              text='My posts'
              onClick={() => displayMyPosts(userData._id)}
            />
            <Dropdown.Item icon='bookmark' text='Saved posts' />
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  )
}

export default ChangeFeedView
