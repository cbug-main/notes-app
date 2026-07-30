import express from 'express'
import verifyToken from '../middleware/verifyToken.js'
import { createNote, getNotes, getANote, updateNote, deleteNote, searchNotes} from '../controller/noteControllers.js'
import validate from '../middleware/validate.js'
import { noteSchema } from '../schemas/noteSchema.js'
import upload from '../middleware/upload.js'

const router = express.Router()

router.use(verifyToken)

router.get('/', getNotes)

router.get('/s', searchNotes)

router.post('/', upload.single("image"), validate(noteSchema), createNote) //create a new note

router.get('/:id', getANote) //gets a single note

router.put('/:id', upload.single("image"), validate(noteSchema), updateNote) //updates a note

router.delete('/:id', deleteNote) //deletes a note


export default router