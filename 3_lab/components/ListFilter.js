
export function ListFilter(array, filterProperty, filterOptions, onFilterChange) {
    const filterElement = document.createElement('div');
    filterElement.classList.add('filter-container');
    filterElement.innerHTML = `
        <label for="toggleVendors" class="label-toggle">
              <hr />
              <hr />
              <hr />
        </label>
        <input type="checkbox" id="toggleVendors" class="hidden-checkbox">
        <div class="toggle-content">
          <p>Filter by ${filterProperty}</p>
          <ul>
            ${filterOptions.map(option => 
              `<li><input type="checkbox" value="${option}" />${option}</li>`
            ).join('')}
          </ul>
        </div>
    `;

    const checkboxes = filterElement.querySelectorAll(".toggle-content ul input[type='checkbox']");

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", () => {
            const selectedValues = Array.from(checkboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.value);

            onFilterChange(filterResults(array, filterProperty, selectedValues));
        });
    });

    return filterElement;
}

/**
 * 
 * @param {Array} array 
 * @param {*} property 
 * @param {Array} filters 
 * @returns 
 */
function filterResults(array, property, filters) {
  if(filters.length === 0) 
    return array;
  else 
    return array.filter((item) => filters.includes(item[property]));
}