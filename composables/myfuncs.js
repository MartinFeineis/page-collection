// export function getProfile(userName, field) {
//     async getData() {
//         const res = await useFetch('media.404founders.com/${userName}/${field}.json');
//       }
//     data = res.field
//     return data
//     }
export const useFoo = () => {
    return useState('foo', () => 'bar')
  }

function getProfData(uname, ppart) { 
    let data = useFetch('media.404founders.com/${userName}/${field}.json');
    return data
}