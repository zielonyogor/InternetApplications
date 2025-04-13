import * as api from './services/api.js';
import * as list from './components/ElixirsList.js';
import { SearchBar } from './components/SearchBar.js';
import { ListFilter } from './components/ListFilter.js';
import { ElixirDetails } from './components/ElixirDetails.js';

const filterOptions = [ 'Unknown', 'Beginner', 'OrdinaryWizardingLevel', 'Moderate', 'Advanced', 'OneOfAKind' ];

let originalArray = [];
let filterArray = [];
let searchArray = [];

const listContainer = document.querySelector('.list-container');
const searchContainer = listContainer.querySelector('.search-container');
const detailsContainer = document.querySelector('.details-container');

const elixirsList = list.ElixirsList(); // loading state
listContainer.appendChild(elixirsList);

init();

async function init() {
    list.ShowLoadingElixirsList(elixirsList);

    originalArray = await api.getAllElixirs();
    filterArray = originalArray;
    searchArray = originalArray;

    list.UpdateElixirsList(originalArray, elixirsList, showDetails);

    const searchElement = SearchBar(originalArray, 'name', updateSearchArray);
    searchElement.classList.add('search-bar');
    searchContainer.appendChild(searchElement);

    const filterElement = ListFilter(originalArray, 'difficulty', filterOptions, updateFilterArray);
    searchContainer.appendChild(filterElement);
}


function updateSearchArray(array) {
    searchArray = array;
    showResults();
}

function updateFilterArray(array) {
    filterArray = array;
    showResults();
}

function showResults() {
    const combined = filterArray.filter(item => searchArray.includes(item));
    list.UpdateElixirsList(combined, elixirsList, showDetails);
}

async function showDetails(id) {
    detailsContainer.innerHTML = '';
    detailsContainer.appendChild(ElixirDetails(id));
}
