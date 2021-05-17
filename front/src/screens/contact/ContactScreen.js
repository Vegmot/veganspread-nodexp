import { useState } from 'react'
import { Grid, Form, Button, Image, Divider } from 'semantic-ui-react'

import styles from './ContactScreen.module.css'

const ContactScreen = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const [displayFirstName, setDisplayFirstName] = useState('')
  const [displayLastName, setDisplayLastName] = useState('')
  const [displayEmail, setDisplayEmail] = useState('')
  const [displayMessage, setDisplayMessage] = useState('')

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleOnSubmit = e => {
    e.preventDefault()
    setIsSubmitted(false)

    setDisplayFirstName(firstName)
    setDisplayLastName(lastName)
    setDisplayEmail(email)
    setDisplayMessage(message)

    setFirstName('')
    setLastName('')
    setEmail('')
    setMessage('')

    setIsSubmitted(true)
  }

  return (
    <>
      <section id='contact-screen' className={styles['contact-screen']}>
        <Image src='/assets/contact_us_03.jpg' size='big' rounded />

        <div className={styles['contact-top-area']}>
          <h2>Running all the time</h2>
          <p>
            Reach out to us anytime you want, as our customer service center is
            open 24/7
          </p>
        </div>

        <div className={styles['contact-info-area-phone']}>
          <h2>Talk to us directly</h2>
          <Image src='/assets/contact_us_02.jpg' size='big' rounded />
          <p>
            We are ready to answer all the questions you have, or just to have a
            talk with you
          </p>

          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column width={4}>
                <p>800-800-8000</p>
                <p>800-800-8001</p>
                <p>800-800-8002</p>
                <p>800-800-8003</p>
              </Grid.Column>

              <Grid.Column width={4}>
                <p>800-800-8000</p>
                <p>800-800-8001</p>
                <p>800-800-8002</p>
                <p>800-800-8003</p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>

        <Divider horizontal>Or</Divider>

        <div className={styles['contact-info-area-msg']}>
          <h2>Send us a message</h2>
          <Image src='/assets/contact_us_01.jpg' size='big' rounded />
        </div>

        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column width={8}>
              <Form
                className={styles['ui form contact-input-area']}
                onSubmit={handleOnSubmit}
              >
                <Form.Field>
                  <label>First Name:</label>
                  <input
                    type='text'
                    name='firstName'
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    placeholder='First name...'
                  />
                </Form.Field>

                <Form.Field>
                  <label>Last Name:</label>
                  <input
                    type='text'
                    name='lastName'
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    placeholder='Last name...'
                  />
                </Form.Field>

                <Form.Field>
                  <label>Email:</label>
                  <input
                    type='email'
                    name='email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder='Email address...'
                  />
                </Form.Field>

                <Form.Field>
                  <label>Message:</label>
                  <textarea
                    row='10'
                    col='30'
                    name='message'
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder='Enter message...'
                    style={{ resize: 'none' }}
                  />
                </Form.Field>

                <Button content='Submit' color='teal' fluid />
              </Form>
            </Grid.Column>

            <Grid.Column width={8}>
              <div className={styles['contact-display-area']}>
                <p>
                  <span>Entered first name</span>: {displayFirstName}
                </p>
                <p>
                  <span>Entered last name</span>: {displayLastName}
                </p>
                <p>
                  <span>Entered email</span>: {displayEmail}
                </p>
                <p>
                  <span>Entered text</span>: {displayMessage}
                </p>

                {isSubmitted && <p>Successfully submitted the data</p>}
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </section>
    </>
  )
}

export default ContactScreen
