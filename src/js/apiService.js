import axios from 'axios';
export default class PicturesApiService {
  constructor() {
    BASE_URL: 'https://pixabay.com/api/';
    KEY: '23997684-9eb4ec0071398138bd37e685f';
    IMAGE_TYPE: 'photo';
    ORIENTATION: 'horizontal';
    PER_PAGE: 12;
    searchQuery: '';
    page: 1;
  }

  async fetchPictures() {
    axios.defaults.baseURL = this.BASE_URL;
    const parameters = `?image_type=${this.IMAGE_TYPE}&orientation=${this.ORIENTATION}&q=${this._searchQuery}&page=${this._page}&per_page=${this.PER_PAGE}&key=${this.KEY}
`;

    const response = await axios.get(parameters);
    console.log(response);
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  resetPage() {
    this.page = 1;
  }
}
