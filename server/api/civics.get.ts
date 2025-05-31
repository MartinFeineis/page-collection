import { createPool, sql } from '@vercel/postgres'

export default defineEventHandler(async () => {
  const db = createPool()
  const id = 14
  try {
    const { rows: question } = await sql`SELECT * FROM questions WHERE ID = ${id}`
    const { rows: answers } = await sql`SELECT * FROM answer WHERE question_id = ${id}`
    return {
      question: question,
      answers: answers,
    }
  } catch (error) {
      throw error
  }
})