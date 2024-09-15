import recipeView from './recipeView';
import icons from '../../img/icons.svg';
import { generatemarkup } from './pagination.js';

export const fetchUrl = async url => {
  try {
    const res2 = await fetch(url);

    if (!res2.ok)
      throw new Error('No recipes found for your query. Please try again!');
    const data2 = await res2.json();
    if (!data2) return;
    if (data2.results === 0) {
      throw new Error(`No recipes found for your query. Please try again!`);
      return;
    }
    return data2;
  } catch (err) {
    throw err;
  }
};

export async function timeout(sec) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('took too long check internet connection'));
    }, 1000 * sec);
  });
}
