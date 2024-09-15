import icons from '../../img/icons.svg';
import { Fraction } from 'fractional';
import * as model from './model.js';
export class recipeView {
  storage = JSON.parse(localStorage.getItem('mydata'));
  parEl = document.querySelector('.recipe');

  render() {
    const preview = document.querySelector('.bookmarks');
    const html = `<div class="message">
                    <div>
                      <svg>
                        <use href="${icons}#icon-smile"></use>
                      </svg>
                    </div>
                    <p>
                      No bookmarks yet. Find a nice recipe and bookmark it :)
                    </p>
                  </div>`;
    preview.innerHTML = '';
    preview.insertAdjacentHTML('afterbegin', html);
  }
  localstorage() {
    if (this.storage) {
      model.state.bookmarks = this.storage;
      this.bookmark(this.storage);
    }
  }
  events(fn) {
    ['hashchange', 'load'].forEach(el => {
      window.addEventListener(el, () => {
        const id = window.location.hash.slice(1);
        if (!id) return;

        fn(id);
      });
    });
  }
  renderSpinner(parel) {
    const spinnerHTML = `<div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>`;

    parel.innerHTML = '';
    parel.insertAdjacentHTML('afterbegin', spinnerHTML);
  }
  renderError(mesg, element) {
    const error = `<div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${mesg}</p>
          </div>`;

    element.innerHTML = '';
    element.insertAdjacentHTML('afterbegin', error);
  }
  renderRecipe(rec) {
    const data2 = rec.ingredients.map(el => {
      return `<li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="${icons}#icon-check"></use>
        </svg>
        <div class="recipe__quantity">${
          el?.quantity ? new Fraction(el?.quantity).toString() : ''
        }</div>
        <div class="recipe__description">
          <span class="recipe__unit">${el.unit ? el.unit : ''}</span>
          ${el.description}
        </div>
      </li>`;
    });

    const html = `
      <figure class="recipe__fig">
              <img src="${rec.imageUrl}" alt="Tomato" class="recipe__img" />
              <h1 class="recipe__title">
                <span>${rec.title}</span>
              </h1>
            </figure><div class="recipe__details">
              <div class="recipe__info">
                <svg class="recipe__info-icon">
                  <use href="${icons}#icon-clock"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${
                  rec.cookingTime
                }</span>
                <span class="recipe__info-text">minutes</span>
              </div>
              <div class="recipe__info">
                <svg class="recipe__info-icon">
                  <use href="${icons}#icon-users"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">${
                  rec.servings
                }</span>
                <span class="recipe__info-text">servings</span>
    
                <div class="recipe__info-buttons">
                  <button class="btn--tiny btn--decrease-servings">
                    <svg>
                      <use href="${icons}#icon-minus-circle"></use>
                    </svg>
                  </button>
                  <button class="btn--tiny btn--increase-servings">
                    <svg>
                      <use href="${icons}#icon-plus-circle"></use>
                    </svg>
                  </button>
                </div>
              </div>
    
              <div class="recipe__user-generated">
                <svg>
                  <use href="${icons}#icon-user"></use>
                </svg>
              </div>
              <button class="btn--round">
                <svg class="bookmarked">
                  <use href="${icons}#icon-bookmark${
      model.state.recipe.bookmarked ? '-fill' : ''
    }"></use>
                </svg>
              </button>
            </div>
            
            <div class="recipe__ingredients">
              <h2 class="heading--2">Recipe ingredients</h2>
              <ul class="recipe__ingredient-list">
                ${data2.join(' ')}
    
            </div>
    
            <div class="recipe__directions">
              <h2 class="heading--2">How to cook it</h2>
              <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span class="recipe__publisher">${
                  rec.publisher
                }</span>. Please check out
                directions at their website.
              </p>
              <a
                class="btn--small recipe__btn"
                href="${rec.sourceUrl}"
                target="_blank"
              >
                <span>Directions</span>
                <svg class="search__icon">
                  <use href="${icons}#icon-arrow-right"></use>
                </svg>
              </a>
            </div>
      `;

    this.parEl.innerHTML = '';
    this.parEl.insertAdjacentHTML('afterbegin', html);
    this.incdecrEvent();
    this.bookmarkEvent();
  }
  incrDecrServeQuantity(operator) {
    if (operator === '+') {
      model.state.recipe.servings = eval(
        `${model.state.recipe.servings}${operator} 1`
      );
      model.state?.recipe?.ingredients.map((v, i) => {
        if (v === '' || undefined) return;

        v.quantity = eval(
          `${v.quantity} ${operator} ${v.quantity} / ${
            model.state.recipe.servings - 1
          }`
        ).toFixed(2);
      });

      this.renderRecipe(model.state.recipe);
    }
    if (operator === '-') {
      if (model.state.recipe.servings === 1) return;
      model.state.recipe.servings = eval(
        `${model.state.recipe.servings}${operator} 1`
      );
      model.state?.recipe?.ingredients.map((v, i) => {
        if (!v) return;

        v.quantity = eval(
          `${v.quantity} ${operator} ${v.quantity} / ${
            model.state.recipe.servings + 1
          }`
        ).toFixed(2);
      });

      this.renderRecipe(model.state.recipe);
    }
  }

  incdecrEvent() {
    const incr = document.querySelector('.btn--increase-servings');
    const decr = document.querySelector('.btn--decrease-servings');
    incr.addEventListener('click', () => {
      this.incrDecrServeQuantity('+');
    });
    decr.addEventListener('click', () => {
      this.incrDecrServeQuantity('-');
    });
  }
  bookmark(val) {
    const preview = document.querySelector('.bookmarks');

    const htm =
      val.length === 0
        ? `<div class="message">
                    <div>
                      <svg>
                        <use href="${icons}#icon-smile"></use>
                      </svg>
                    </div>
                    <p>
                      No bookmarks yet. Find a nice recipe and bookmark it :)
                    </p>
                  </div>`
        : val
            .map(v => {
              return `
      <li class="preview">
                      <a class="preview__link" href="#${v.id}">
                        <figure class="preview__fig">
                          <img src="${v.imageUrl}" alt="Test" />
                        </figure>
                        <div class="preview__data">
                          <h4 class="preview__name">
                            ${v.title}
                          </h4>
                          <p class="preview__publisher">${v.publisher}</p>
                        </div>
                      </a>
                    </li>
      `;
            })
            .join(' ');
    preview.innerHTML = '';
    preview.insertAdjacentHTML('afterbegin', htm);
  }
  bookmarkEvent() {
    const bt = document.querySelector('.btn--round');

    bt.addEventListener('click', () => {
      model.state.recipe.bookmarked
        ? (model.state.recipe.bookmarked = false)
        : (model.state.recipe.bookmarked = true);
      this.renderRecipe(model.state.recipe);

      if (model.state.recipe.bookmarked === true) {
        model.state.bookmarks.push(model.state.recipe);
      }
      if (model.state.recipe.bookmarked === false) {
        model.state.bookmarks.find((v, i) => {
          if (v?.id === model.state.recipe?.id) {
            model.state.bookmarks.splice(i, 1);
          }
        });
      }
      localStorage.setItem('mydata', JSON.stringify(model.state.bookmarks));
      this.storage = model.state.bookmarks;
      this.bookmark(model.state.bookmarks);
    });
  }
}
export default new recipeView();
