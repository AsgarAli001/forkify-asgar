import icons from 'url:../../img/icons.svg';
import View from './view.js';
import previewView from './previewView';

class ResultsView extends View {
  _parentEl = document.querySelector('.results');

  _errMsg = 'No recipe found for your query! Please try again :(';
  _successMsg = 'We could not find the recipe. Please try another one!';

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();
