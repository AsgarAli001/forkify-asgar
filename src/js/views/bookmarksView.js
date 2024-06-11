import icons from 'url:../../img/icons.svg';
import View from './view.js';
import previewView from './previewView';

class BookmarksView extends View {
  _parentEl = document.querySelector('.bookmarks__list');

  _errMsg = 'No bookmarks yet. Find a nice recipe and bookmarked it :(';
  _successMsg = 'We could not find the recipe. Please try another one!';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView();
