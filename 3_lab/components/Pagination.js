/**
 * 
 * @param {Array} array 
 * @param {int} numberOfResults 
 */
export function Pagination(array, numberOfResults, onPageChanged, currentPage) {
    const numberOfPages = Math.ceil(array.length / numberOfResults);

    const paginationElement = document.createElement('div');
    paginationElement.classList.add('nav-page');
    paginationElement.innerHTML = `
        <button id="btn-prev-page" ${currentPage == 1 ? 'disabled' : ''}><</button>
        <span>Page ${currentPage} of ${numberOfPages}</span>
        <button id="btn-next-page" ${currentPage == numberOfPages ? 'disabled' : ''}>></button>
    `;

    const prevPageButton = paginationElement.querySelector('#btn-prev-page');
    const nextPageButton = paginationElement.querySelector('#btn-next-page');

    prevPageButton.addEventListener('click', () => {
        onPageChanged(currentPage - 1);
        window.scrollTo(0, 0);
    });
    nextPageButton.addEventListener('click', () => {
        onPageChanged(currentPage + 1);
        window.scrollTo(0, 0);
    });
    
    return paginationElement;
}