import {createPool} from 'mysql12'

export const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: 3306,
    database: 'companydb'
})
