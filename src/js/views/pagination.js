import icons from '../../img/icons.svg';
import searchViews from './searchView.js';
import * as model from './model.js';
export const pagcontainer = document.querySelector('.pagination');
class Pagination {
  handlepagEvent() {
    pagcontainer.addEventListener('click', e => {
      const z = e.target.closest('.btn--inline').dataset.id;
      if (!z) return;

      const d = this.pagination(model.state.search.results, +z);
      searchViews.generatemarkup(d);
    });
  }

  pagination(ar, page) {
    const startIndex = (page - 1) * 10;
    const endIndex = page * 10;
    const as = ar.slice(startIndex, endIndex);
    const hey = this.generatemarkup(page, ar.length);

    if (!hey) pagcontainer.insertAdjacentHTML('afterbegin', '');
    if (hey) pagcontainer.insertAdjacentHTML('afterbegin', hey);
    return as;
  }

  generatemarkup(pgnum, length) {
    pagcontainer.innerHTML = '';

    const current = Math.ceil(length / 10);

    if (pgnum > current) return;
    if (pgnum === 1 && pgnum < current) {
      return `<button data-id="${
        pgnum + 1
      }" class="btn--inline pagination__btn--next">
                    <span>Page ${pgnum + 1}</span>
                    <svg class="search__icon">
                      <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                  </button>`;
    }
    if (pgnum > 1 && pgnum < current) {
      return `
            <button data-id="${
              pgnum - 1
            }" class="btn--inline pagination__btn--prev">
                        <svg class="search__icon">
                          <use href="src/img/icons.svg#icon-arrow-left"></use>
                        </svg>
                        <span>Page ${pgnum - 1}</span>
                      </button>
                      <button data-id="${
                        pgnum + 1
                      }" class="btn--inline pagination__btn--next">
                    <span>Page ${pgnum + 1}</span>
                    <svg class="search__icon">
                      <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                  </button>
                      
            `;
    }

    if (pgnum === current) {
      return `<button data-id="${
        pgnum - 1
      }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-left"></use>
            </svg>
            <span>Page ${pgnum - 1}</span>
          </button>`;
    }
  }
}
export default new Pagination();
