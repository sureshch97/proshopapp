import express from 'express'
import { authUser, getuserProfile, registerUser, UpdateuserProfile, users, deleteUser, updateUser } from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'


const router = express.Router();

router.post('/login', authUser)
router.route('/profile').get(protect, getuserProfile).put(protect, UpdateuserProfile);
router.route('/:id').put(protect, admin, updateUser)
router.route('/').get(protect, admin, users)
router.route('/:id').delete(protect, deleteUser)
router.route('/').post(registerUser)





export default router