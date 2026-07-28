import bcrypt from 'bcrypt'
import db from '../database/db.js'
import jwt from 'jsonwebtoken'

export function register(req, res) {
    const { username, password } = req.body
    const hashedPass = bcrypt.hashSync(password, 8)
        
    try {
        const insertUser = db.prepare(`INSERT INTO users (username, password) VALUES (?, ?)`)
        const result = insertUser.run(username, hashedPass)
    
        const token = jwt.sign({ id: result.lastInsertRowid }, process.env.JWT_SECRET, { expiresIn: '24h' })
        res.json({ token })
    
    } catch (err) {
        console.error(err)
    }
}

export function login(req, res) {
    const { username, password } = req.body

    try {
        const userExsists = db.prepare('SELECT * FROM users WHERE username = ?')
        const user = userExsists.get(username)

        if (!user) return res.status(404).send({ message: `no such user found` })

        const passMatched = bcrypt.compareSync(password, user.password)
        if (!passMatched) return res.status(401).send({ message: `password is invalid` })

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' })
        res.json({ token })
        
    } catch(err) {
        console.error(err)
    }
}

export function remove(req, res) {

    try {
        const statement = db.prepare(`DELETE FROM users WHERE id = ?`)
        const result = statement.run(req.user.id)
        
        if (result.changes === 0) {
            return res.status(404).send({message: 'User Not Found'})
        }
        return res.json({
            message: 'User Deleted'
        })
    } catch (err) {
        console.error(err) 

        return res.status(500).json({
            message: 'internal error'
        })
    }
}