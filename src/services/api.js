export function fetchImages(query) {
  const BASE_URL = 'https://pixabay.com/api/';
  const KEY = '14611902-cba6e6d3c19977a925f1406cc';

  return fetch(
    `${BASE_URL}?q=${query}&page=1&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error(`Sorry, but ${query} is not found`));
  });
}
