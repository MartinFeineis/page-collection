export function getProfile(userName, field) {
    async getData() {
        const res = await useFetch('media.404founders.com/${userName}/${field}.json');
      }
    data = res.field
    return data
    }