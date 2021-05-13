import React from 'react'
import { Divider } from 'semantic-ui-react'
import Timer from '../../utils/Timer'

import './AboutScreen.css'

const AboutScreen = () => {
  return (
    <>
      <section id='about-screen' className='about-screen'>
        <h1>About Screen</h1>

        <Divider />

        <div>
          <Timer />
        </div>
      </section>
    </>
  )
}

export default AboutScreen
