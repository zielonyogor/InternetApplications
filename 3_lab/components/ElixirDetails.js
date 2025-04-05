import { getElixir } from "../services/api.js";

export function ElixirDetails(id) {
    const detailsElement = document.createElement('div');
    detailsElement.classList.add('details-card');
    detailsElement.innerHTML = `<p class="loading-msg">Loading details...</p>`;

    getElixir(id).then(elixir => {
        detailsElement.innerHTML = `
            <h3 class="elixir-name">${elixir['name']}</h3>
            <table>
                <tbody>
                    <tr>
                        <td>Difficulty</td>
                        <td>${elixir['difficulty']}</td>
                    </tr>
                    <tr>
                        <td>Effect</td>
                        <td>${elixir['effect'] ?? 'No effect known'}</td>
                    </tr>
                    <tr>
                        <td>Side effects</td>
                        <td>${elixir['sideEffects'] ?? 'No side effects known'}</td>
                    </tr>
                    <tr>
                        <td>Characteristics</td>
                        <td>${elixir['characteristics'] ?? 'No characteristics known'}</td>
                    </tr>
                    <tr>
                        <td>Ingredients</td>
                        <td>${
                            !elixir['ingredients']?.length 
                                ? 'No ingredients known'
                                : elixir['ingredients'].map(el => el.name).join(', ')
                        }</td>
                    </tr>
                    <tr>
                        <td>Inventors</td>
                        <td>${
                            !elixir['inventors']?.length 
                                ? 'No inventors known'
                                : elixir['inventors'].map(el =>
                                    `${el.firstName ?? ''} ${el.lastName}`.trim()
                                ).join(', ')
                        }</td>
                    </tr>
                    <tr>
                        <td>Time</td>
                        <td>${elixir['time'] ?? 'No time known'}</td>
                    </tr>
                    <tr>
                        <td>Manufacturer</td>
                        <td>${elixir['manufacturer'] ?? 'No manufacturer known'}</td>
                    </tr>
                </tbody>
            </table>
        `;
    }).catch(() => {
        detailsElement.innerHTML = `<p class="error-details">Failed to load elixir details.</p>`;
    });

    return detailsElement;
}