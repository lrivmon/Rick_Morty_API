
// CONSTANTES
const charactersEl = document.querySelector('#characters');
const nameFilterEl = document.querySelector('#name-filter');
const statusFilterEl = document.querySelector('#status-filter');

// FUNCIONES

async function getCharacters (name, status){

    let url = 'https://rickandmortyapi.com/api/character/';

    if (name || status){
        url += '?';
        if(name){
            url += `name=${name}&`;
        }

        if(status){
            url += `status=${status}`;
        }
    }

    const response = await fetch(url);
    const data = await response.json();

    return data.results;
}

// FUNCION LLAMADO A LA API
async function displayCharacters (name,status){

    // obtener los personajes filtrados
    const characters = await getCharacters(name,status);

    charactersEl.innerHTML = '';

    // renderizar los personajes
    for( let character of characters){
        const card = document.createElement('div');
        card.classList.add('character-card');

        card.innerHTML =`
            <img src="${character.image}" />
            <h2> ${character.name}</h2>
            <p> Status: ${character.status}</p>
            <p> Status: ${character.species}</p>
        `;

        charactersEl.appendChild(card);
    }
}

displayCharacters();

nameFilterEl.addEventListener('input', () => {
    displayCharacters(nameFilterEl.value, statusFilterEl.value);
});

statusFilterEl.addEventListener('change', () => {
    displayCharacters(nameFilterEl.value, statusFilterEl.value);
});

