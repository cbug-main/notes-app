import express from 'express'
import { register, login, remove, refresh } from '../controller/authControllers.js'
import verifyToken from '../middleware/verifyToken.js'
import registerSchema from '../schemas/registerSchema.js'
import loginSchema from '../schemas/loginSchema.js'
import validate from '../middleware/validate.js'
import { verifyRefresh } from '../middleware/verifyRefreshToken.js'

const router = express.Router()

router.post('/register', validate(registerSchema), register)
router.post('/login', validate(loginSchema),login)
router.delete('/remove/', verifyToken, remove)
router.post('/refresh', verifyRefresh, refresh)

export default router