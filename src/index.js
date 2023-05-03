import './css/style.css';
import Notiflix from 'notiflix';
import getImage from './getImage.js';
import createMarkup from './createMarkup.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const input = form.querySelector('[name="searchQuery"]');
const loadMoreBtn = document.querySelector('.load-more');

let currentPage = 1;
export const perPage = 40;

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  close: true,
});

form.addEventListener('submit', handleFormSubmit);

async function handleFormSubmit(event) {
  event.preventDefault();

  const searchQuery = input.value.trim();
  currentPage = 1;

  if (!searchQuery) {
    Notiflix.Notify.failure('Enter the query in the search!');
    gallery.innerHTML = '';
    loadMoreBtn.style.display = 'none';

    return;
  }
  createGallery(searchQuery);
}

loadMoreBtn.addEventListener('click', handleLoadMore);

async function handleLoadMore(event) {
  currentPage += 1;

  event.preventDefault();
  const searchQuery = input.value.trim();

  createGallery(searchQuery);
}

async function createGallery(query) {
  try {
    const data = await getImage(query, currentPage);
    gallery.innerHTML = '';
    gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));

    lightbox.refresh();

    if (data.totalHits > currentPage * perPage) {
      loadMoreBtn.style.display = 'block';
    } else {
      loadMoreBtn.style.display = 'none';
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
  } catch (error) {
    Notiflix.Notify.failure('Something went wrong. Please try again later.');
  }
}
