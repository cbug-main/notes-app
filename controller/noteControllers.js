import db from '../database/db.js'

export function createNote (req, res) {
    
    const { title, content } = req.body
    const userID = req.user.id

    const image = req.file?.filename ?? null

    const statement= db.prepare(`
        INSERT INTO notes(title, content, image, userId) 
        VALUES(?, ?, ?, ?)`)
    const result = statement.run(title, content, image, userID)

    return res.status(201).send({ 
        message: 'Note Created', 
        noteId: result.lastInsertRowid 
    })
}

export function getNotes (req, res) {
    
    const userId = req.user.id 

    const { page = 1, limit = 10, search = ""} = req.query
    const offset = (page - 1) * limit
    const statement = db.prepare(`
        SELECT id, title, content, image
        FROM notes
        WHERE userId = ?
        LIMIT ?
        OFFSET ?
    `)

    const notes = statement.all(
        userId, 
        Number(limit), 
        offset
    )

    return res.status(200).send({
        notes
    })
}

export function searchNotes (req, res) {
    const userId = req.user.id 
    const { page = 1, limit = 10, search = ""} = req.query
    const searchTerm = `%${search}%`
    const offset = (page - 1) * limit

    const statement = db.prepare(`
        SELECT id, title, content, image
        FROM notes
        WHERE userId = ?
        AND (
            title LIKE ?
            OR content LIKE ?
        )
            LIMIT ?
            OFFSET ?
    `)

    const notes = statement.all(
        userId, 
        searchTerm,
        searchTerm,
        Number(limit),
        offset
    )
    
    return res.status(200).send({
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

    const image = req.file ? req.file.filename : null
    
    const statement = db.prepare(`
        UPDATE notes 
        SET 
            title = COALESCE(?, title),
            content = COALESCE(?, content),
            image = COALESCE(?, image)
        WHERE userId = ? AND id = ?
    `)

    const result = statement.run(
        title ?? null,
        content ?? null, 
        image ?? null,
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
    const userId = req.user.id
    const { id } = req.params 
    
    try {
        const statement = db.prepare(`
            DELETE FROM notes 
            WHERE id = ? AND userId = ?
        `)

        const result = statement.run(id, userId)
        
        if (result.changes === 0) {
            return console.log('nothing has changed')
        }

    } catch (err) {
        console.error(err)
    }
}