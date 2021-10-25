import axios from 'axios';
export default class PicturesApiService {
  constructor() {
    this.BASE_URL = 'https://pixabay.com/api/';
    this.KEY = '23997684-9eb4ec0071398138bd37e685f';
    this.IMAGE_TYPE = 'photo';
    this.ORIENTATION = 'horizontal';
    this.PER_PAGE = 12;
    this.MAX_PAGES = 42;
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchPictures() {
    axios.defaults.baseURL = this.BASE_URL;
    const parameters = `?image_type=${this.IMAGE_TYPE}&orientation=${this.ORIENTATION}&q=${this.searchQuery}&page=${this.page}&per_page=${this.PER_PAGE}&key=${this.KEY}
`;

    const response = await axios.get(parameters);
    if (response.status === 200) return response.data;
    throw new Error('Error fetching data');
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  get isFirstPage() {
    return this.page === 1;
  }

  incPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  reachMaxPage() {
    return this.page > this.MAX_PAGES ? true : false;
  }
}
