import db from '../database/db.js'

export default function createNote (req, res) {
    const { title, content } = req.body

    const userID = req.user.id

    const statement= db.prepare(`INSERT INTO notes(title, content, userId) VALUES(?, ?, ?)`)
    const result = statement.run(title, content, userID)

    return res.status(201).send({ 
        message: 'Note Created', 
        noteId: result.lastInsertRowid 
    })
}

export default function getNotes (req, res) {
    const userId = req.user.id
    
    const statement = db.prepare(`
        SELECT id, title, content, image 
        FROM notes 
        WHERE userId = ?
    `)
    const notes = statement.all(userId)

    res.status(200).send({
        notes
    })
}

export default function getANote (req, res) {
    const userId = req.user.id
    const { id } = req.params

    const statement = db.prepare(`
        SELECT id, title, content, image
        FROM notes
        WHERE userId = ? AND id = ?    
    `)
    const note = statement.get(userId, id)
    
    if (!note) return res.status(404).send({
        message: "note doesn't exist"
    })
    
    res.status(200).send({
        note
    })
}