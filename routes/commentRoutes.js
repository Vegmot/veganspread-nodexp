import express from 'express'
import {
  writeComment,
  getAllComments,
  getTopThreeComments,
  getComment,
  getAllMyComments,
  updateComment,
  deleteComment,
} from '../controllers/commentControllers.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/:pid/top3').get(getTopThreeComments)
router.route('/:pid').get(getAllComments).post(protect, writeComment)
router.route('/:uid').get(protect, getAllMyComments)
router
  .route('/:pid/:cid')
  .get(protect, getComment)
  .patch(protect, updateComment)
  .delete(protect, deleteComment)

export default router
