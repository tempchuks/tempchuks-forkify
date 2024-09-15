import * as model from './model.js';
import recipeView from './recipeView';
import searchViews from './searchView.js';
import { pagcontainer, pagination } from './helpers.js';
import { PAGINATIONUM } from './config.js';
import Pagination from './pagination.js';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
async function showRecipe() {
  recipeView.render();
  // call eventlisteners
  recipeView.localstorage();
  recipeView.events(model.loadRecipe);

  searchViews.handleEvent();
  Pagination.handlepagEvent();

  const bt = document.querySelectorAll('.btn--round');
}
showRecipe();
