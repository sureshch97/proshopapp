import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Form, FormLabel, FormControl, FormGroup, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/message'
import FormContainer from '../components/FormContainer'
import { Login } from '../actions/userAction'


const LoginScreen = ({ location, history }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const redirect = location.search ? location.search.split('=')[1] : '/'

  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin);
  const { loading, userInfo, error } = userLogin



  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])



  const onSubmitHandler = (e) => {

    e.preventDefault()
    dispatch(Login(email, password))


  }
  return (
    <FormContainer>
      <h1>SignIn</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={onSubmitHandler}>
        <Form.Group controlId='email'>

          <FormLabel>Email Address</FormLabel>
          <Form.Control value={email}
            placeholder='Email Address'
            type='email'
            onChange={e => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <FormLabel>Password</FormLabel>
          <Form.Control
            value={password}
            type='password'
            placeholder='Password'
            onChange={e => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>Sign In</Button>
      </Form>
      <Row className='py-3'>
        <Col>New Customer ?<Link to={redirect ? `/register?redirect=${redirect}` : `/register`}>Rigester</Link></Col>

      </Row>

    </FormContainer>
  )
}

export default LoginScreen
