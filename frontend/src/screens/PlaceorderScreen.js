import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Image, Card, ListGroup, Button } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderAction'

const PlaceorderScreen = ({ history }) => {

    const cart = useSelector(state => state.cart);

    const dispatch = useDispatch();

    const adddecimals = (num) => {
        return ((Math.round(num * 100) / 100).toFixed(2))
    }
    // prices
    cart.itemsPrice = adddecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
    cart.shippingPrice = adddecimals(cart.itemsPrice > 100 ? 0 : 100);
    cart.taxPrice = adddecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
    cart.totalPrice = (Number(cart.taxPrice) + Number(cart.itemsPrice) + Number(cart.shippingPrice)).toFixed(2);

    const orderCreate = useSelector(state => state.orderCreate);
    const { order, error, success } = orderCreate

    useEffect(() => {


        if (success) {

            history.push(`/order/${order._id}`)
        }
        // eslint-disable-next-line
    }, [history, success])

    const plcaorderHandler = () => {

        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            itemsPrice: cart.itemsPrice,
            paymentMethod: cart.paymentMethod,
            taxPrice: cart.taxPrice,
            shippingPrice: cart.shippingPrice,
            totalPrice: cart.totalPrice


        }));
    }

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />

            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping:</h2>
                            <p>
                                <strong>Address:</strong>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                                {cart.shippingAddress.postalCode},{' '}
                                {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method:</strong>
                                {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart.cartItems.length === 0 ? <Message>Your cart is Empty</Message> : (

                                <ListGroup variant='flush'>
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item>
                                            <Col md={1}>
                                                <Image src={item.image} alt={item.name} fluid rounded />
                                            </Col>


                                            <Col>
                                                <Link to={`/product/${item.product}`}>
                                                    {item.name}
                                                </Link>
                                            </Col>

                                            <Col md={4}>
                                                {item.qty} x ${item.price} = ${item.qty * item.price}
                                            </Col>

                                        </ListGroup.Item>
                                    ))}


                                </ListGroup>
                            )}
                        </ListGroup.Item>

                    </ListGroup>
                </Col>


                <Col md={4}>
                    <Card>
                        <ListGroup>
                            <ListGroup.Item>
                                <h2>Order Summmary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax </Col>
                                    <Col>${cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button type='button'
                                    className='btn btn-block'
                                    onClick={plcaorderHandler}
                                    disabled={cart.cartItems
                                        .length === 0}>Place Order</Button>
                            </ListGroup.Item>
                        </ListGroup>

                    </Card>

                </Col>
            </Row>
        </>
    )
}

export default PlaceorderScreen
