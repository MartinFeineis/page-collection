export default defineEventHandler((event) => {
  const query = getQuery(event)

  return { msg: query.msg }
})
