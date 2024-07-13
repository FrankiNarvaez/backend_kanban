import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const connectionString: string = process.env.DATABASE_URL as string

export const pool = new pg.Pool({
  allowExitOnIdle: true,
  connectionString
})
