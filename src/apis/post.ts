import express, { Request, Response } from 'express'

const router = express.Router()

interface RequestWithConnection extends Request {
    mysqlConnection: any
}

router.post('/signup', async (request: Request, response: Response) => {
    const req = request as RequestWithConnection
    const res = response
    const { id, pw, name, birth, email, tel } = req.body

    const connection = req.mysqlConnection
    await connection.run(`INSERT INTO users (id, pw, name, birth, email, tel) VALUES (?, ?, ?, ?, ?, ?)`, [id, pw, name, birth, email, tel])

    res.json('success')
})

export default router
