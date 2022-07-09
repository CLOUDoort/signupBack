import express, { Request, Response } from 'express'

const router = express.Router()

interface RequestWithConnection extends Request {
    mysqlConnection: any
}

router.get('/userInfo', async (request: Request, response: Response) => {
    const req = request as RequestWithConnection
    const res = response

    const connection = req.mysqlConnection
    const userData = await connection.run(`SELECT id, name, email FROM users`)

    res.send(userData)
})

router.post('/signup', async (request: Request, response: Response) => {
    const req = request as RequestWithConnection
    const res = response
    const { id, pw, name, birth, email, tel } = req.body

    const connection = req.mysqlConnection
    await connection.run(`INSERT INTO users (id, pw, name, birth, email, tel) VALUES (?, ?, ?, ?, ?, ?);`, [id, pw, name, birth, email, tel])

    res.json({
        message: 'success',
    })
})

export default router
