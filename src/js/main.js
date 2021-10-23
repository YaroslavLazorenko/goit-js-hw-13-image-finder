import cardTemplate from '../templates/card.hbs';
import PicturesApiService from './apiService';
import refs from './refs';

const { list } = refs;
const data = [{ webformatURL: '1' }, { webformatURL: '2' }];
list.insertAdjacentHTML('beforeend', cardTemplate(data));
console.log(cardTemplate(data));
const picturesApiService = new PicturesApiService();
