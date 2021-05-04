import React from 'react'
import { useDispatch } from 'react-redux'
import { Button, Menu, Dropdown } from 'semantic-ui-react'
import { openModal } from '../../modals/modalReducer'

const SignedOutMenu = () => {
  const dispatch = useDispatch()

  return (
    <>
      {window.innerWidth < 500 ? (
        <>
          <Dropdown icon='user circle large' className='user-dropdown'>
            <Dropdown.Menu>
              <Dropdown.Item
                icon='sign-in'
                text='Login'
                onClick={() => dispatch(openModal({ modalType: 'LoginForm' }))}
              />
              <Dropdown.Item
                icon='user plus'
                text='Register'
                onClick={() =>
                  dispatch(openModal({ modalType: 'RegisterForm' }))
                }
              />
            </Dropdown.Menu>
          </Dropdown>
        </>
      ) : (
        <>
          <Menu.Item position='right'>
            <Button
              onClick={() => dispatch(openModal({ modalType: 'LoginForm' }))}
              basic
              inverted
              content='Login'
            />

            <Button
              onClick={() => dispatch(openModal({ modalType: 'RegisterForm' }))}
              color='teal'
              content='Register'
              style={{ marginLeft: '0.5em' }}
            />
          </Menu.Item>
        </>
      )}
    </>
  )
}

export default SignedOutMenu
