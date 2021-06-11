import express from 'express'
import { protect, admin } from '../middleware/authMiddleware.js'
import {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateproduct,
    createProductReview,
    getTopProducts
} from '../controllers/productController.js'

const router = express.Router();

router.route('/').get(getProducts).post(protect, admin, createProduct)
router.route('/top').get(getTopProducts)
router.route('/:id/reviews').post(protect, createProductReview)
router.route('/:id').get(getProductById)
router.route('/:id').delete(protect, deleteProduct).put(protect, updateproduct)






export default router