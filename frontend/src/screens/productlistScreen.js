import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Col, Row } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/message'
import { listProducts, deleteproduct, createproduct } from '../actions/productActions'
import Paginate from '../components/Paginate'

const ProductListScreen = ({ history, match }) => {

    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch();



    const productList = useSelector(state => state.productList);
    const { loading, products, error, page, pages } = productList

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin

    const deleteProduct = useSelector(state => state.deleteProduct);
    const { success: successDelete } = deleteProduct



    useEffect(() => {

        if (userInfo && userInfo.isAdmin) {
            dispatch(listProducts('', pageNumber));
        } else {
            history.push('/login')
        }

    }, [dispatch, history, userInfo, successDelete, pageNumber]);


    const createProductHandler = () => {
        dispatch(createproduct());
    }


    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(deleteproduct(id))
        }
    }
    return (
        <>

            <Row>
                <Col className='align-items-center'>

                    <h1>Products</h1>
                </Col>

                <Col className='text-right'>

                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus' /> Create Product
                   </Button>

                </Col>
            </Row>


            {loading ? <Loader /> : error ? <Message vaariant='danger'>{error}</Message> : (
                <>
                    <Table stripped bordered hover responsive className='table-sm'>

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th>EDIT/DELETE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (

                                <tr key={product._id}>


                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.brand}</td>
                                    <td>{product.brand}</td>

                                    <td>
                                        <LinkContainer to={`/admin/products/${product._id}/edit`}>
                                            <Button variant='light' className='btn-sm'>
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                        </LinkContainer>

                                        <Button variant='danger' className='btn-sm' onClick={() => { deleteHandler(product._id) }}>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </td>


                                </tr>

                            ))}
                        </tbody>

                    </Table>
                    <Paginate pages={pages} page={page} isAdmin={true} />
                </>
            )}
        </>
    )
}

export default ProductListScreen
