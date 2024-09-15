import { PAGINATIONUM } from './config.js';
import { pagination } from './helpers.js';
import { searchRecipe } from './model';
import { state } from './model.js';
import recipeView from './recipeView.js';
import searchViews from './searchView.js';
import { pagcontainer } from './helpers.js';
import { generatemarkup } from './helpers.js';
import Pagination from './pagination.js';
export const showSearchData = function (data) {
  if (!data) return;
  const { recipes } = data;
  state.search.results = recipes.map(v => {
    return {
      image: v.image_url,
      title: v.title,
      publisher: v.publisher,
      id: v.id,
    };
  });
  const resolvedData = state.search.results;
  const wait = Pagination.pagination(state.search.results, PAGINATIONUM);
  searchViews.generatemarkup(wait);
};
