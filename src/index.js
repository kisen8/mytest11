import axios from 'axios';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import ApiService from './js/api-service';

const apiService = new ApiService();

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  btnLoadMore: document.querySelector('.load-more'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.btnLoadMore.addEventListener('click', onLoadMore);

function onFormSubmit(e) {
  e.preventDefault();

  apiService.searchQuery = e.currentTarget.elements.searchQuery.value;

  apiService.resetPage();

  apiService.fetchGallery().then(createGalleryMarkup);
}

function onLoadMore() {
  apiService.fetchGallery().then(createGalleryMarkup);
}

function createGalleryMarkup(cards) {
  refs.gallery.insertAdjacentHTML(
    'beforeend',
    cards
      .map(
        ({
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        }) => `<div class="photo-card">
      <a href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" height ="300" width = "400" />
        <div class="info">
          <p class="info-item">
            <b>Likes: ${likes}</b>
          </p>
          <p class="info-item">
            <b>Views: ${views}</b>
          </p>
          <p class="info-item">
            <b>Comments: ${comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads: ${downloads}</b>
          </p>
        </div>
        </a>
      </div>`
      )
      .join('')
  );
}
