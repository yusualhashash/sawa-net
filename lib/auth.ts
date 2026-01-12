import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function verifyAdmin(username: string, password: string): Promise<boolean> {
  try {
    const result = await sql`
      SELECT password FROM admin_users WHERE username = ${username}
    `

    if (result.length === 0) {
      return false
    }

    return password === result[0].password
  } catch (error) {
    console.error("Auth error:", error)
    return false
  }
}

export async function createAdmin(username: string, password: string) {
  await sql`
    INSERT INTO admin_users (username, password) 
    VALUES (${username}, ${password})
  `
}
