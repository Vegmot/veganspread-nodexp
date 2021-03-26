import React from 'react';
import { Button } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

import './UserDetailsScreen.css';

const UserDetailScreen = ({ history }) => {
  return (
    <>
      <Button
        content='Go back'
        icon='angle left'
        style={{
          background: 'transparent',
          padding: 0,
          marginTop: '6%',
          marginLeft: '18%',
        }}
        onClick={history.goBack}
      />

      <section id='user-details-screen' className='user-details-screen'>
        <h1>Details page on this user is coming soon.</h1>
      </section>
    </>
  );
};

export default withRouter(UserDetailScreen);
