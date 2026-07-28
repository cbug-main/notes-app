import express from 'express'
import verifyToken from '../middleware/verifyToken'
import { createNote, getNotes } from '../controller/noteControllers'

const router = express.Router()

router.use(verifyToken)

router.get('/', getNotes) //get all the notes
router.post('/', createNote) //create a new note
router.get('/:id', getANote) //gets a single note

export default router