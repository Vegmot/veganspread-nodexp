import express from 'express'
import { authUser } from '../controllers/userControllers.js'

const router = express.Router()

router.route('/').get().post(authUser)

export default router
