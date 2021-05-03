import express from 'express'
import {
  authUser,
  registerUser,
  getUserById,
  getLoggedInUser,
  deleteUser,
} from '../controllers/userControllers.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/login').post(authUser)
router.route('/register').post(registerUser)
router.route('/:uid').get(protect, getUserById).delete(protect, deleteUser)
router.route('/').get(protect, getLoggedInUser)

export default router
