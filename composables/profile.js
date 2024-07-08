export function getProfile(userName, field) {
    async getData() {
        const res = await useFetch('media.404founders.com/${userName}/profile.json');
      }
    data = res.field
    return data
    }