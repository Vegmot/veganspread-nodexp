import express from 'express'
import {
  writePost,
  getPostById,
  getAllPublicPosts,
  updatePost,
  deletePost,
  getMyPosts,
} from '../controllers/postControllers.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router
  .route('/:pid')
  .get(getPostById)
  .patch(protect, updatePost)
  .delete(protect, deletePost)
router.route('/:uid').get(protect, getMyPosts)
router.route('/').get(getAllPublicPosts).post(protect, writePost)

export default router
