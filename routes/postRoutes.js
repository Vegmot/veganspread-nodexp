import express from 'express'
import {
  writePost,
  getPost,
  updatePost,
  deletePost,
} from '../controllers/postControllers.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect, writePost)
router
  .route('/:pid')
  .get(getPost)
  .put(protect, updatePost)
  .delete(protect, deletePost)
