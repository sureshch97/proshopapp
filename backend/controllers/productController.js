
import asynchandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc    Fetch all product
// @route   GET /api/products
// @access  Public
const getProducts = asynchandler(async (req, res) => {

  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
      name: {
        $regex: req.query.keyword,
        $options: 'i',
      },
    }
    : {}

  const count = await Product.countDocuments({ ...keyword })
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ products, page, pages: Math.ceil(count / pageSize) })
});


// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asynchandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
});


const createProduct = asynchandler(async (req, res) => {
  const product = await new Product({

    name: 'sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'sample brand',
    category: 'sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'sample description'
  })

  const createproduct = await product.save()
  res.status(201).json(createproduct)


});




// @desc    delete users
// @route   DELETE /api/users/:id
// @access  private

const deleteProduct = asynchandler(async (req, res) => {

  const product = await Product.findById(req.params.id)


  if (product) {
    await product.remove();
    res.json({ message: 'product removed' })
  } else {
    res.status(404);
    throw new Error('product NOT FOUND')
  }


});



// @desc    edit users
// @route   UPDATE /api/users/:id
// @access  private/Admin

const updateproduct = asynchandler(async (req, res) => {

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = req.body.name || product.name
    product.price = req.body.price || product.price
    product.image = req.body.image || product.image
    product.category = req.body.category || product.category
    product.brand = req.body.brand || product.brand

    const updatedProduct = await product.save()

    res.json({
      _id: updatedProduct._id,
      name: updatedProduct.name,
      price: updatedProduct.price,
      image: updatedProduct.image,
      category: updatedProduct.category,
      brand: updatedProduct.brand,
    })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }


});



// @desc    edit users
// @route   UPDATE /api/users/:id
// @access  private/Admin

const createProductReview = asynchandler(async (req, res) => {

  const {
    rating, comment
  } = req.body

  const product = await Product.findById(req.params.id);

  if (product) {

    const alreadyReviewd = product.reviews.find(r => r.user.toString() === req.user._id.toString())


    if (alreadyReviewd) {

      res.status(400);
      throw new Error('Product Already Reviewd')

    }

    const review = {

      rating: Number(rating),
      comment,
      user: req.user._id,
      name: req.user.name,
    }
    product.reviews.push(review);

    product.numReviews = product.reviews.length

    product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

    await product.save()
    res.status(200).json({ message: 'new Review added' })

  } else {
    res.status(404)
    throw new Error('Product not found')
  }


})






// @desc    Top Products
// @route   UPDATE /api/peoducts/top
// @access  Public

const getTopProducts = asynchandler(async (req, res) => {

  const products = await Product.find({}).sort({ rating: -1 }).limit(3)

  res.json(products)


})
export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct, updateproduct,
  createProductReview,
  getTopProducts
}

