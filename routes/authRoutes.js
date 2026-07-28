import express from 'express'
import { register, login, remove } from '../controller/authControllers.js'
import verifyToken from '../middleware/verifyToken.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.delete('/remove/', verifyToken, remove)

export default router