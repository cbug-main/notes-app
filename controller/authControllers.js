import bcrypt from 'bcrypt'
import db from '../database/db.js'
import jwt from 'jsonwebtoken'

export function register(req, res) {
    const { username, password } = req.body
    const hashedPass = bcrypt.hashSync(password, 8)
        
    try {
        const insertUser = db.prepare(`INSERT INTO users (username, password) VALUES (?, ?)`)
        const result = insertUser.run(username, hashedPass)
    
        const accessToken = jwt.sign(
            {id: result.lastInsertRowid }, 
            process.env.JWT_SECRET, 
            { expiresIn: '15m' }
        )

        const refreshToken = jwt.sign(
            {id: result.lastInsertRowid}, 
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: '7d' }
        )

        const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000

        const insertRefreshToken = db.prepare(`
            INSERT INTO refresh_tokens(token, userId, expiresAt)
            VALUES(?, ?, ?)
        `)

        res.json({ accessToken, refreshToken })
    
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

        const accessToken = jwt.sign(
            { id: user.id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '15m' }
        )

        const refreshToken = jwt.sign(
            { id: user.id },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: '7d' }
        )

        const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000

        const insertRefreshToken = db.prepare(`
            INSERT INTO refresh_tokens(token, userId, expiresAt)
            VALUES(?, ?, ?)
        `)
        
        insertRefreshToken.run(
            refreshToken,
            user.id,
            expiresAt
        )

        res.json({ accessToken, refreshToken })
        
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

export function refresh (req, res) {

    const { refreshToken } = req.body
    const { id } = req.user

    // creating an access token based on the refresh token 
    const accessToken = jwt.sign(
        { id : req.user.id },
        process.env.JWT_SECRET, 
        {expiresIn: '15m'} 
    )
    // removing the old refresh token
    const found = db.prepare(`
        SELECT * FROM refresh_tokens
        WHERE token = ?
    `).get(refreshToken)
    
    console.log(`This is the found token: ${found}`)

    const deleteResult = db.prepare(`
        DELETE FROM refresh_tokens
        WHERE token = ?
    `).run(refreshToken)

    console.log(deleteResult)
    //create the new refresh token now 
    const newRefreshToken = jwt.sign(
        { id : id }, 
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d' }
    )
    //store the new refresh Token in database
    const pushNewRefreshToken = db.prepare(`
        INSERT INTO refresh_tokens(token, userId, expiresAt)
        VALUES(?, ?, ?)
    `)
    const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000

    const result = pushNewRefreshToken.run(newRefreshToken, id, expiresAt)

    res.json({
        accessToken,
        refreshToken : newRefreshToken
    })

}