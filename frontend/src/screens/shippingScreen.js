import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, FormLabel, FormControl, Button } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/message'
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../actions/cartAction'
import CheckoutSteps from '../components/CheckoutSteps'

const ShippingScreen = ({ history }) => {

      const cart = useSelector(state => state.cart);
      const { shippingAddress } = cart

      const [address, setAddress] = useState(shippingAddress.address);
      const [city, setCity] = useState(shippingAddress.city);
      const [postalCode, setpostalCode] = useState(shippingAddress.postalCode);
      const [country, setCountry] = useState(shippingAddress.country);

      const dispatch = useDispatch();

      const onSubmitHandler = (e) => {

            e.preventDefault();
            dispatch(saveShippingAddress({ address, city, postalCode, country }));
            history.push('/payment')
      }

      return <FormContainer>
            <h2>Shipping</h2>
            <CheckoutSteps step1 step2 />
            <Form onSubmit={onSubmitHandler}>
                  <Form.Group controlId='address'>
                        <FormLabel>Address</FormLabel>
                        <FormControl
                              value={address}
                              placeholder='Address'
                              required='true'
                              onChange={e => setAddress(e.target.value)}
                        ></FormControl>
                  </Form.Group>

                  <Form.Group controlId='city'>
                        <FormLabel>City</FormLabel>
                        <FormControl
                              value={city}
                              placeholder='City'
                              required='true'
                              onChange={e => setCity(e.target.value)}
                        ></FormControl>
                  </Form.Group>

                  <Form.Group controlId='postalCode'>
                        <FormLabel>Postal Code</FormLabel>
                        <FormControl
                              value={postalCode}

                              placeholder='Postal Code'
                              required='true'
                              onChange={e => setpostalCode(e.target.value)}
                        ></FormControl>
                  </Form.Group>

                  <Form.Group controlId='Country'>
                        <FormLabel>Country</FormLabel>
                        <FormControl
                              value={country}
                              placeholder='Country'
                              required='true'
                              onChange={e => setCountry(e.target.value)}
                        ></FormControl>
                  </Form.Group>
                  <Button type='submit' variant='primary'>
                        Submit
        </Button>
            </Form>
      </FormContainer>


}

export default ShippingScreen
