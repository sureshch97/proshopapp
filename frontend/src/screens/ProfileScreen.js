import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Row, Col, FormLabel, FormControl, Button, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/message'
import { UpdateuserProfile, getuserDetails, getUpdatedUserProfile } from '../actions/userAction'
import { listMyOrders } from '../actions/orderAction'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'


const ProfileScreen = ({ location, history }) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.userDetails);
  const { loading, user, error } = userDetails

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin

  const orderListMy = useSelector(state => state.orderListMy);
  const { orders, loading: loadingOrders, error: errorOrders } = orderListMy

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile
  const userUpdatedProfile = useSelector((state) => state.userUpdatedProfile)
  const { success: successupdatedprofile } = userUpdatedProfile

  useEffect(() => {

    dispatch(listMyOrders())


  }, [])

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        //dispatch(getuserDetails('profile'));

        dispatch(getUpdatedUserProfile())

      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }


  }, [history, userInfo, user, dispatch, success])

  const onSubmitHandler = (e) => {

    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(UpdateuserProfile({ id: user._id, name, email, password }))

    }


  }
  return <Row>
    <Col md={4}>
      <h2>Update Profile</h2>
      {message && <Message variant='danger'>{message}</Message>}{ }
      {successupdatedprofile && <Message variant='success'>Profile Updated</Message>}
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
            placeholder='Enter Your Name'
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
          Update
        </Button>
      </Form>
    </Col>
    <Col md={8}>
      <h2>My Orders</h2>


      {loadingOrders ? (
        <Loader />
      ) : errorOrders ? (
        <Message variant='danger'>{errorOrders}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>

            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice}</td>
                <td>
                  {order.ispaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button className='btn-sm' variant='light'>
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}

          </tbody>
        </Table>
      )}

    </Col>
  </Row>
}

export default ProfileScreen

