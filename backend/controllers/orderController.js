import asynchandler from 'express-async-handler'
import Order from '../models/orderModel.js'

// @desc    CREATE ORDER
// @route   GET /api/orders
// @access  Private
const postOrder = asynchandler(async (req, res) => {

  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    itemsPrice,
    totalPrice
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400).json('No order found')
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      taxPrice,
      shippingPrice,
      itemsPrice,
      totalPrice
    });

    const createOrder = await order.save();
    res.status(201).json(createOrder)
  }


});





// @desc    Fetch order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderbyid = asynchandler(async (req, res) => {

  const order = await Order.findById(req.params.id).populate('user', 'name email');
  console.log(order);
  if (order) {
    res.json(order)
  } else {
    res.status(401)
    throw new Error('Order not found');
  }

});



// @desc    Update order to paid
// @route   put /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asynchandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.ispaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }


    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
});



//@desc    Update order to Deliveres
// @route   put /api/orders/:id/delivered
// @access  Private
const updateOrderToDelivered = asynchandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()


    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})




// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asynchandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.json(orders)
})



// @desc    get orders logged in user
// @route   GET /api/orders
// @access  Private/ADMIN
const getOrders = asynchandler(async (req, res) => {

  const orders = await Order.find({}).populate('user', 'id name');


  res.json(orders)

});
export { postOrder, getOrderbyid, updateOrderToPaid, updateOrderToDelivered, getMyOrders, getOrders }