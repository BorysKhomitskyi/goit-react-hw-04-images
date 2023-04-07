const URL = 'https://pixabay.com/api/';
const KEY = '33617461-7c32c6af14cfde54b4496ca9a';
const FILTER = '&image_type=photo&orientation=horizontal&per_page=12';

function fetchImages(query, page = 1) {
  return fetch(`${URL}?q=${query}&page=${page}&key=${KEY}${FILTER}`).then(
    response => response.json()
  );
}

export default fetchImages;