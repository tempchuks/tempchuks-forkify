import recipeView from './recipeView.js';
import { Views } from './views.js';
import { showSearchData } from './views.js';
import favicon from '../../img/favicon.png';
import { fetchUrl, timeout } from './helpers.js';
import { API_URL, timeoutSec } from './config.js';

class Searchview {
  data;
  parel = document.querySelector('.results');
  cont = document.querySelector('.search-results');
  input = document.querySelector('.search__field');
  search = document.querySelector('.search');
  render(data) {
    this.data = data;
  }
  generatemarkup(data) {
    const html = data.map(v => {
      return `
            <li class="preview">
                    <a
                      class="preview__link preview__link--active"
                      href="#${v.id}"
                    >
                      <figure class="preview__fig">
                        <img src="${v.image}" alt="Test" />
                      </figure>
                      <div class="preview__data">
                        <h4 class="preview__title">${v.title}</h4>
                        <p class="preview__publisher">${v.publisher}</p>
                        <div class="preview__user-generated">
                          <svg>
                            <use href="${v.image}"></use>
                          </svg>
                        </div>
                      </div>
                    </a>
                  </li>
            `;
    });
    this.parel.innerHTML = '';
    this.parel.insertAdjacentHTML('afterbegin', html.join(' '));
  }
  handleEvent() {
    this.search.addEventListener('submit', async e => {
      e.preventDefault();
      recipeView.renderSpinner(this.parel);
      const data = await this.searchRecipe(this.input.value);
      if (!data) return;

      showSearchData(data);
    });
  }

  async searchRecipe(query) {
    try {
      const data2 = await Promise.race([
        fetchUrl(`${API_URL}?search=${query}`),
        timeout(timeoutSec),
      ]);
      if (!data2) return;
      const { data } = data2;

      if (!data) return;
      if (data.length === 0) throw new Error(`recipe for ${query} not found`);

      return data;
    } catch (error) {
      const el = this.parel;
      recipeView.renderError(error.message, el);
    }
  }
}

export default new Searchview();
