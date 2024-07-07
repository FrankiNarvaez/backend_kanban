import pg from 'pg'
import 'dotenv/config'

const connectionString = process.env.DATABASE_URL

export const pool = new pg.Pool({
  allowExitOnIdle: true,
  connectionString
})
