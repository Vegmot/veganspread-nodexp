import express from 'express'
import {
  authUser,
  registerUser,
  getUser,
  deleteUser,
} from '../controllers/userControllers.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/login').post(authUser)
router.route('/register').post(registerUser)
router.route('/:uid').get(protect, getUser).delete(protect, deleteUser)

export default router
