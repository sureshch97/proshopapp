
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { Link } from 'react-router-dom'
import { Button, Row, Col, Image, Card, ListGroup, } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/message'
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderAction'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants'
import { Fragment } from 'react'

const OrderScreen = ({ match }) => {

    const orderId = match.params.id;

    const dispatch = useDispatch();

    const [sdkReady, setsdkReady] = useState(false);


    const orderDetails = useSelector(state => state.orderDetails);
    const { order, error, loading } = orderDetails;

    const orderPay = useSelector(state => state.orderPay);
    const { loading: loadingPay, success: successPay } = orderPay;

    const orderDeliver = useSelector(state => state.orderDeliver);
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver;


    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin


    if (!loading) {

        const adddecimals = (num) => {
            return ((Math.round(num * 100) / 100).toFixed(2))
        }
        // prices
        order.itemsPrice = adddecimals
            (order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0));

    }

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult));


    }

    useEffect(() => {

        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setsdkReady(true)
            }
            document.body.appendChild(script)
        }


        if (!order || successPay || successDeliver || order._id !== orderId) {
            dispatch({ type: ORDER_PAY_RESET });
            dispatch({ type: ORDER_DELIVER_RESET });
            dispatch(getOrderDetails(orderId));
        } else if (!order.ispaid) {

            if (!window.paypal) {
                addPayPalScript()
            } else {
                setsdkReady(true)
            }

        }


        // eslint-disable-next-line
        // changed object dependencies inorder to get rid of zoid error in paypal
    }, [dispatch, order, orderId, successPay, successDeliver]);


    const deliverHandeler = () => {

        dispatch(deliverOrder(order))
    }

    return loading ? <Loader /> : error ?
        <Message variant='danger'>{error}</Message> :
        <Fragment>
            <h1> Order {order._id} </h1>

            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Name: </strong> {order.user.name}
                            </p>
                            <p>
                                <strong>Email: </strong>{' '}
                                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                            </p>

                            <p>
                                <strong>Address:</strong>
                                {order.shippingAddress[0].address}, {order.shippingAddress[0].city}{' '}
                                {order.shippingAddress[0].postalCode},{' '}
                                {order.shippingAddress[0].country}
                            </p>
                            {order.isDelivered ?
                                <Message variant='success'>Delivered on {order.deliveredAt}</Message> :
                                <Message variant='danger'>Not Delivered</Message>}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method:</strong>
                                {order.paymentMethod}
                            </p>
                            {order.ispaid ?
                                <Message variant='success'>Paid on {order.paidAt}</Message> :
                                <Message variant='danger'>Not Paid</Message>}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ? <Message>Your cart is Empty</Message> : (

                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
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
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax </Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            {!order.ispaid && (

                                <ListGroup.Item>
                                    {loadingPay && <Loader />}
                                     
                                        <PayPalButton
                                            amount={order.totalPrice}
                                            onSuccess={successPaymentHandler}
                                        />
                                    
                                </ListGroup.Item>
                            )}
                           
                            {userInfo.isAdmin && order.ispaid && !order.isDelivered && (
                                <ListGroup.Item>
                                    <Button type='button' className='btn btn-block' onClick={deliverHandeler}>
                                        Mark as Delivered
                                    </Button>
                                </ListGroup.Item>
                            )}


                        </ListGroup>

                    </Card>

                </Col>
            </Row>
        </Fragment>
}

export default OrderScreen
