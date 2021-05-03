import express from 'express'
import {
  writeComment,
  getComment,
  getAllMyComments,
  updateComment,
  deleteComment,
} from '../controllers/commentControllers.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/:pid').post(protect, writeComment)
router.route('/:uid').get(protect, getAllMyComments)
router
  .route('/:pid/:cid')
  .get(protect, getComment)
  .patch(protect, updateComment)
  .delete(protect, deleteComment)

export default router
