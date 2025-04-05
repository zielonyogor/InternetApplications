import { getElixir } from "../services/api.js";

export async function ElixirDetails(id) {
    const elixir = await getElixir(id);
    
    const detailsElement = document.createElement('div');
    detailsElement.classList.add('details-card');

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
                        <td>${elixir['effect'] == null ? 'No effect known' : elixir['effect']}</td>
                    </tr>
                    <tr>
                        <td>Side effects</td>
                        <td>${elixir['sideEffects'] == null ? 'No side effects known' : elixir['sideEffects']}</td>
                    </tr>
                    <tr>
                    <td>Characteristics</td>
                        <td>${elixir['characteristics'] == null ? 'No characteristics known' : elixir['characteristics']}</td>
                        </tr>
                    <tr>
                    <td>Ingredients</td>
                        <td>${(elixir['ingredients'] == null || elixir['ingredients'].length === 0) 
                            ? 'No ingredients known' 
                            : elixir['ingredients'].map(el => el['name']).join(', ')}</td>
                    </tr>
                    <tr>
                        <td>Inventors</td>
                        <td>${(elixir['inventors'] == null || elixir['inventors'].length === 0) 
                            ? 'No inventors known' 
                            : elixir['inventors'].map(el => 
                                `${el.firstName === null ? '' : el.firstName+' '}${el.lastName}`
                            ).join(', ')}</td>
                    </tr>
                    <tr>
                        <td>Time</td>
                        <td>${elixir['time'] == null ? 'No time known' : elixir['time']}</td>
                    </tr>
                    <tr>
                        <td>Manufacturer</td>
                        <td>${elixir['manufacturer'] == null ? 'No manufacturer known' : elixir['manufacturer']}</td>
                    </tr>
                    </tbody>
            </table>
    `;

    return detailsElement;
}