import 'regenerator-runtime/runtime';
import 'core-js/stable';
import * as model from './model';
import { MODAL_CLOSE_SEC } from './config';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';
import bookmarksView from './views/bookmarksView';
import addRecipeView from './views/addRecipeView';

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpinner();
    // 0) Update result view to mark selected search result
    resultsView.update(model.getSearchResultPage());

    bookmarksView.update(model.state.bookmark);

    // 1) Loading recipe
    await model.loadRecipe(id);

    // 2) Rendering Recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    // console.log(e);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // 1) Get Search Query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load Search Recipe
    await model.loadSearchResults(query);

    // 3) Render Result
    resultsView.render(model.getSearchResultPage());

    // 4) Render initial pagination button
    paginationView.render(model.state.search);
  } catch (err) {
    // recipeView.renderError();
    console.log(err);
  }
};

const controlPagination = function (gotoPage) {
  // 3) Render New Result
  resultsView.render(model.getSearchResultPage(gotoPage));

  // 4) Render New pagination button
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Updating the recipe servings (in state)
  model.updateServings(newServings);

  // Update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // Add/Remove. bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  // 2) Update recipe view
  recipeView.update(model.state.recipe);

  // Render the bookmarks
  bookmarksView.render(model.state.bookmark);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmark);
};

const clearBookmarks = function () {
  localStorage.clear('bookmark');
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Show Loading Spinner
    addRecipeView.renderSpinner();

    await model.uploadRecipe(newRecipe);

    // Render Recipe
    recipeView.render(model.state.recipe);

    // Success Message
    addRecipeView.renderSuccess();

    // Render Recipe View
    bookmarksView.render(model.state.bookmark);

    // Change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    // window.history.back();

    // Close Form Window
    setTimeout(() => {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error(err);
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerBtnClick(controlPagination);
  addRecipeView.addHandlerUploadRecipe(controlAddRecipe);
};
init();
