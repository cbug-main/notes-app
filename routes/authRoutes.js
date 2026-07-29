import express from 'express'
import { register, login, remove } from '../controller/authControllers.js'
import verifyToken from '../middleware/verifyToken.js'
import registerSchema from '../schemas/registerSchema.js'
import loginSchema from '../schemas/loginSchema.js'
import validate from '../middleware/validate.js'

const router = express.Router()

router.post('/register', validate(registerSchema), register)
router.post('/login', validate(loginSchema),login)
router.delete('/remove/', verifyToken, remove)

export default router