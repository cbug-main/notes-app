import db from '../database/db.js'

export function createNote (req, res) {
    const { title, content } = req.body

    const userID = req.user.id

    const statement= db.prepare(`INSERT INTO notes(title, content, userId) VALUES(?, ?, ?)`)
    const result = statement.run(title, content, userID)

    return res.status(201).send({ 
        message: 'Note Created', 
        noteId: result.lastInsertRowid 
    })
}

export function getNotes (req, res) {
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

export function getANote (req, res) {
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

export function updateNote (req, res) {

    const userId = req.user.id
    const { id } = req.params
    const { title, content } = req.body
    
    const statement = db.prepare(`
        UPDATE notes 
        SET 
            title = COALESCE(?, title),
            content = COALESCE(?, content)
        WHERE userId = ? AND id = ?
    `)

    const result = statement.run(
        title ?? null,
        content ?? null, 
        userId, 
        id
    )
    
    if (result.changes === 0) {
        return res.status(404).send({
            message: "Note not found"
        })
    }


    res.status(201).send({
        message: "Update Successful"
    })
}

export function deleteNote (req, res) {
    const { id } = req.params 
    
    try {
        const statement = db.prepare(`
            DELETE FROM notes WHERE id = ?
        `)

        const result = statement.run(id)
        
        if (result.changes === 0) {
            return console.log('nothing has changed')
        }

    } catch (err) {
        console.error(err)
    }
}