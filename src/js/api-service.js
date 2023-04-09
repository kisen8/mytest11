export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 40;
  }

  fetchGallery() {
    console.log(this);
    const url = `https://pixabay.com/api/?key=29875471-e0a2deab5b44e6e08843ad533&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.perPage}`;

    // console.log(e.currentTarget.elements);
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.incrementPage();
        return data.hits;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newSearchQuery) {
    this.searchQuery = newSearchQuery;
  }
}
