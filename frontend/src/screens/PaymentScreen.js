import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form, FormLabel, Col, Button, FormGroup } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { savePaymentMethod } from '../actions/cartAction'
import CheckoutSteps from '../components/CheckoutSteps'

const PaymentScreen = ({ history }) => {

    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart

    const dispatch = useDispatch();

    if (!shippingAddress.address) {
        history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }
    return <FormContainer>
        <CheckoutSteps step3 step4 />
        <h2>Payment Here</h2>
        <Form onSubmit={submitHandler}>
            <FormLabel as='legend'>Select Method</FormLabel>
            <Col>
                <FormGroup>
                    <Form.Check
                        type='radio'
                        label='PayPal or Credit Card'
                        id='PayPal'
                        name='paymentMethod'
                        value='PayPal'
                        checked
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    ></Form.Check>
                </FormGroup>
                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Col>


        </Form>

    </FormContainer>
}

export default PaymentScreen
