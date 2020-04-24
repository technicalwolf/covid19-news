export const get = async (path) => {
  let result;
  await fetch(path)
    .then((response) => {
      return response.json();
    })
    .then((rs) => {
      result = rs.data;
    })
    .catch((error)=>{
      console.error(error);
    });
  
  return result;
}