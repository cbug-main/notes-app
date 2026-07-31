import jwt from 'jsonwebtoken'
import db from '../database/db.js'

export function verifyRefresh (req, res, next) {
    const { refreshToken } = req.body

    if(!refreshToken) {
        return res.status(401).send({ 
            message: 'Refresh Token required'
        })
    }
    try {

        const decoded = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET
        )

        const storedToken = db.prepare(`
            SELECT * FROM refresh_tokens
            WHERE token = ?
        `).get(refreshToken)

        if(!refreshToken) {
            return res.status(403).send({
                message: 'Refresh token revoked'
            })
        }

        req.user = decoded

        next()

    } catch(err) {
    console.log(err)

    return res.status(403).send({
        message: err.message
    })
}
}