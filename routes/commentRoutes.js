import express from 'express'
import {
  writeComment,
  getComment,
  updateComment,
  deleteComment,
} from '../controllers/commentControllers.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/:pid').post(protect, writeComment)
router
  .route('/:pid/:cid')
  .get(protect, getComment)
  .put(protect, updateComment)
  .delete(protect, deleteComment)
