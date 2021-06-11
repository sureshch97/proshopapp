import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, FormLabel, FormControl, Button } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/message'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userAction'


const RigesterScreen = ({ location, history }) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch();
  const userRigester = useSelector(state => state.userRigester);
  const { loading, userInfo, error } = userRigester

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const onSubmitHandler = (e) => {

    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(register(name, email, password))
      setMessage('Successfully Rigestered')

    }


  }
  return (
    <FormContainer>
      <h1>Rigester Here</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={onSubmitHandler}>

        <Form.Group controlId='Name'>

          <FormLabel>Name</FormLabel>
          <FormControl
            value={name}
            placeholder='Enter Your Name'
            onChange={e => setName(e.target.value)}
          ></FormControl>

        </Form.Group>


        <Form.Group controlId='Email'>
          <FormLabel>Email</FormLabel>
          <FormControl
            value={email}
            placeholder='Enter Your Email'
            onChange={e => setEmail(e.target.value)}
          ></FormControl>
        </Form.Group>


        <Form.Group controlId='Password'>
          <FormLabel>Password</FormLabel>
          <FormControl
            value={password}
            type='password'
            placeholder='Password'
            onChange={e => setPassword(e.target.value)}
          ></FormControl>
        </Form.Group>



        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Register
        </Button>
      </Form>

    </FormContainer>
  )
}

export default RigesterScreen
