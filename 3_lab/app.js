import * as api from './services/api.js';
import * as search from './components/SearchBar.js';
import * as list from './components/ElixirsList.js';
import {ElixirDetails} from './components/ElixirDetails.js';

// Options for filter
const filterOptions = [ 'Unknown', 'Beginner', 'OrdinaryWizardingLevel', 'Moderate', 'Advanced', 'OneOfAKind' ];


// List of elixirs
const listContainer = document.querySelector('.list-container');

const searchElement = search.SearchBar(api.getAllElixirs(), 'name', 'difficulty', filterOptions, showSearch);
searchElement.classList.add('search-bar');
listContainer.appendChild(searchElement);

const elixirsList = list.ElixirsList(api.getAllElixirs(), showDetails);
listContainer.appendChild(elixirsList);

function showSearch(result){
    list.UpdateElixirsList(result, elixirsList, showDetails);
}


// Elixir details
const detailsContainer = document.querySelector('.details-container');

async function showDetails(id) {    
    detailsContainer.innerHTML = ''; // Just clear previous details
    detailsContainer.appendChild(await ElixirDetails(id));
}