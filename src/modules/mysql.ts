import mysql, { Connection } from 'mysql2/promise'
import mysqlConfig from '../configs/mysql'

const { ID, PASSWORD, HOST, DB_NAME } = mysqlConfig

const DB_URL = `mysql://${ID}:${PASSWORD}@${HOST}/${DB_NAME}?ssl={"rejectUnauthorized":true}`

interface customConnection extends Connection {
    run?: Function
}

export interface connectionWithRunFunction extends Connection {
    run: Function
}

const connect = async () => {
    const connection: customConnection = await mysql.createConnection(DB_URL)
    const run = async (sql: string, params: any[] = []) => {
        const [rows, field] = await connection.execute(sql, params)
        return rows
    }
    connection.run = run
    return connection as connectionWithRunFunction
}

export default {
    connect,
}
