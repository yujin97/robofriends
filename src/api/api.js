export const apiCall = (link) =>
  fetch(link)
    .then(response => response.json())
    .catch(error => {throw error});