import { Fraction } from 'fractional';
import recipeView from './recipeView';
import icons from '../../img/icons.svg';
import { fetchUrl } from './helpers.js';
import { API_URL } from './config.js';
import { timeout } from './helpers.js';
import { timeoutSec } from './config.js';
const recipeContainer = document.querySelector('.recipe');
export const state = {
  recipe: {},
  search: {
    results: {},
  },
  bookmarks: [],
};

// search recipe

// load recipe
export const loadRecipe = async function (id) {
  try {
    recipeView.renderSpinner(recipeView.parEl);

    const data2 = await Promise.race([
      fetchUrl(`${API_URL}/${id}`),
      timeout(timeoutSec),
    ]);

    if (!data2) return;
    let recipe = await data2.data.recipe;
    state.recipe = {
      imageUrl: recipe.image_url,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      ingredients: recipe.ingredients,
      cookingTime: recipe.cooking_time,
      servings: recipe.servings,
      id: recipe.id,
    };

    if (state.bookmarks.find(v => v.id === state.recipe.id))
      state.recipe.bookmarked = true;
    recipeView.renderRecipe(state.recipe);
  } catch (error) {
    recipeView.renderError(error.message, recipeView.parEl);
  }
};
