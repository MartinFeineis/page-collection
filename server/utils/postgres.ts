// import postgres from 'postgres'

// export function usePostgres () {
//   if (!process.env.NUXT_POSTGRES_URL) {
//     throw createError('Missing `NUXT_POSTGRES_URL` environment variable')
//   }

//   return postgres(process.env.NUXT_POSTGRES_URL as string, {
//     ssl: 'require'
//   })
// }


import postgres from 'postgres'

// This function determines which database to use based on environment
export function usePostgres() {
  let connectionString: string

  if (process.env.VERCEL_ENV) {
    // In Vercel (production and development), use Vercel PostgreSQL
    connectionString = process.env.POSTGRES_URL || process.env.NUXT_POSTGRES_URL
    if (!connectionString) {
      throw new Error('Missing Vercel PostgreSQL connection string')
    }
    return postgres(connectionString, {
      ssl: { rejectUnauthorized: false }, // Ensure SSL is used with Vercel's DB
    })
  } else {
    // In local development, use the local PostgreSQL database
    connectionString = process.env.NUXT_POSTGRES_URL
    if (!connectionString) {
      throw new Error('Missing `NUXT_POSTGRES_URL` environment variable for local development')
    }
    return postgres(connectionString, {
      ssl: false, // Local PostgreSQL usually doesn't require SSL
    })
  }
}
