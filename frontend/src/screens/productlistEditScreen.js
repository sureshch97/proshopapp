import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, NavbarBrand } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listDetailsProduct, editproduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'


const ProductlistEditScreen = ({ match, history }) => {

  const productId = match.params.id



  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [countInStock, setcountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setuploading] = useState(false);



  const dispatch = useDispatch();




  const productDetails = useSelector(state => state.productDetails);
  const { loading, product, error } = productDetails

  const Updateuser = useSelector(state => state.Updateuser);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate, } = Updateuser;


  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      history.push('/admin/productlist')
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listDetailsProduct(productId))
      } else {
        setName(product.name)
        setBrand(product.brand)
        setPrice(product.price)
        setCategory(product.category)
        setImage(product.image)
        setDescription(product.image)
        setcountInStock(product.countInStock)




      }
    }
  }, [dispatch, history, productId, product, successUpdate])

  const submitHandler = (e) => {

    e.preventDefault();


    dispatch(editproduct({ _id: productId, name, price, brand, category, image, description, countInStock }))
  };

  const uploadFileHandler = async (e) => {

    const file = e.target.files[0];
    const formData = new FormData()

    formData.append('image', file);
    setuploading(true);

    try {

      const config = {
        headers:
        {
          'Content-type': 'multipart/form-data'
        }
      };

      const { data } = await axios.post('/api/upload', formData, config);

      setImage(data);
      setuploading(false)

    } catch (error) {

      console.log(error);

      setuploading(false)

    }
  }


  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
    </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price in Dollars'
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='category'
                placeholder=' Enter Category'
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='brand'
                placeholder='Enter Brand'
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='description'
                placeholder='write Description'
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
          </Button>
          </Form>
        )}
      </FormContainer>
    </>

  )
}

export default ProductlistEditScreen