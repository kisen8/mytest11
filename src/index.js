import axios from 'axios';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import ApiService from './js/api-service';
import BtnLoadMore from './js/btn-load-more';

const apiService = new ApiService();

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  btnLoadMore: document.querySelector('.load-more'),
  endText: document.querySelector('.end__text'),
};

const btnLoadMore = new BtnLoadMore({
  selector: '.load-more',
  hidden: true,
});

refs.form.addEventListener('submit', onFormSubmit);
btnLoadMore.refs.btn.addEventListener('click', fetchCards);

function onFormSubmit(e) {
  e.preventDefault();

  apiService.searchQuery = e.currentTarget.elements.searchQuery.value.trim();

  if (apiService.searchQuery === '') {
    return alert('Please write some values in input');
  }

  btnLoadMore.show();
  apiService.resetPage();
  clearGalleryMarkup();

  fetchCards();
}

// function onLoadMore() {
//   fetchCards();
// }

function fetchCards() {
  btnLoadMore.disable();
  apiService.fetchGallery().then(cards => {
    createGalleryMarkup(cards);
    btnLoadMore.enable();
  });
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

function clearGalleryMarkup() {
  refs.gallery.innerHTML = '';
}
