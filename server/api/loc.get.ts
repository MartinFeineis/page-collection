export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const h3index = query.h3index as string;
  return {'h3': h3index }
});
