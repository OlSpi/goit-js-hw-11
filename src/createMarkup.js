function createMarkup(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<div class="photo-card">
        <a class="gallery-link" href="${webformatURL}">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" data-src="${largeImageURL}" class="gallery-img" width ='300';/>
          <div class="info">
            <p class="info-item"><b>Likes</b> ${likes}</p>
            <p class="info-item"><b>Views</b> ${views}</p>
            <p class="info-item"><b>Comments</b> ${comments}</p>
            <p class="info-item"><b>Downloads</b> ${downloads}</p>
          </div>
          </a>
        </div>`
    )
    .join('');
}
export default createMarkup;
