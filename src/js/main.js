import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import cardTemplate from '../templates/card.hbs';
import PicturesApiService from './apiService';
import refs from './refs';

const { list, searchForm, sentinel } = refs;
const picturesApiService = new PicturesApiService();
let lightbox = new SimpleLightbox('.gallery a', {
  /* options */
});

searchForm.addEventListener('submit', onSearch);

const observer = new IntersectionObserver(onEntry, {
  rootMargin: '150px',
});
observer.observe(sentinel);

function onSearch(evt) {
  evt.preventDefault();
  picturesApiService.query = evt.currentTarget.elements.query.value;

  if (picturesApiService.query.trim() === '') {
    return Notify.warning('The search query is empty! Please, enter a valid query.');
  }

  clearMarkup();
  picturesApiService.resetPage();
  picturesApiService
    .fetchPictures()
    .then(result => {
      if (result.totalHits === 0) {
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      } else {
        Notify.success(`"Hooray! We found ${result.totalHits} images."`);
        appendPicturesMarkup(result.hits);
        picturesApiService.incPage();
      }
    })
    .catch(err => console.error(err.message, err.name));
}

function appendPicturesMarkup(data) {
  list.insertAdjacentHTML('beforeend', cardTemplate(data));
  lightbox.refresh();
}

function clearMarkup() {
  list.innerHTML = '';
}

function onEntry(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting && picturesApiService.query !== '') {
      if (picturesApiService.reachMaxPage()) {
        Notify.warning('We have shown you the maximum number of pictures.');
      } else {
        picturesApiService
          .fetchPictures()
          .then(result => {
            appendPicturesMarkup(result.hits);
            picturesApiService.incPage();
          })
          .catch(err => console.error(err.message, err.name));
      }
    }
  });
}
