import icons from 'url:../../img/icons.svg';
import View from './view.js';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');
  //   _currentPage;

  addHandlerBtnClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const gotoPage = +btn.dataset.goto;
      //   console.log(gotoPage);
      handler(gotoPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1 , and there are other pages
    if (currentPage === 1 && numPages > 1) {
      return this._generateMarkupBtnNext(currentPage);
    }

    // Last page
    if (currentPage === numPages && numPages > 1) {
      return this._generateMarkupBtnPre(currentPage);
    }
    // Other page
    if (currentPage < numPages) {
      return this._generateMarkupBtn(currentPage);
    }
    // Page 1 , and there are no other pages
    return '';
  }

  _generateMarkupBtn(currentPage) {
    return `
        <button data-goto=${
          currentPage - 1
        } class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
        </button>

        <button data-goto=${
          currentPage + 1
        } class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>

    `;
  }
  _generateMarkupBtnPre(currentPage) {
    return `
        <button data-goto=${
          currentPage - 1
        } class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
        </button>
    `;
  }
  _generateMarkupBtnNext(currentPage) {
    return `
        <button data-goto=${
          currentPage + 1
        } class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
        `;
  }
}

export default new PaginationView();
