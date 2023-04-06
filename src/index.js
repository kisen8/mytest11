import axios from 'axios';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  btnLoadMore: document.querySelector('.load-more'),
};

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  const search = e.currentTarget.elements.searchQuery.value;

  console.log(e.currentTarget.elements);
  fetch(
    `https://pixabay.com/api/?key=29875471-e0a2deab5b44e6e08843ad533&q=${search}&image_type=photo&orientation=horizontal&safesearch=true`
  )
    .then(response => response.json())
    .then(console.log);
}
