import express from 'express'
import verifyToken from '../middleware/verifyToken.js'
import { createNote, getNotes, getANote, updateNote, deleteNote } from '../controller/noteControllers.js'
import validate from '../middleware/validate.js'
import { noteSchema } from '../schemas/noteSchema.js'

const router = express.Router()

router.use(verifyToken)

router.get('/', getNotes) //get all the notes
router.post('/', validate(noteSchema), createNote) //create a new note
router.get('/:id', getANote) //gets a single note
router.put('/:id', validate(noteSchema), updateNote) //updates a note
router.delete('/:id', deleteNote) //deletes a note

export default router