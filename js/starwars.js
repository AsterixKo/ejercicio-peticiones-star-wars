// const loadMoviesAndCharacters = () =>{
//     return new Promise((resolve, reject) =>{
//         fetch('https://swapi.dev/api/films/');
//     });
// };

const getMoviesInfo = async () => {
    const myMoviesData = await fetch('https://swapi.dev/api/films/');
    const myMovies = await myMoviesData.json();
    await paintMoviesOnDiv(myMovies);
    $('#loading').hide();
};

try {
    getMoviesInfo();
} catch (error) {
    console.log('error', error);
}


async function paintMoviesOnDiv(myMovies) {
    $('#movies').empty();

    let divMoviesContent = '';
    let cont = 0;
    let i = 0;
    for (const movie of myMovies.results) {
        // if (cont === 0) {//esto lo he puesto para pruebas y no hacer muchas peticiones
        divMoviesContent += '<div class="movie">'
        divMoviesContent += `<h2>${movie.title}</h2>`;
        for (const character of movie.characters) {
            const myCharacterData = await fetch(character);
            const myCharacter = await myCharacterData.json();
            divMoviesContent += `<h4 onclick="displayCharacter('id-character-${i}','${character}');">${myCharacter.name}</h4>`;

            divMoviesContent += `<div id="id-character-${i}" class="character"></div>`;
            i++;
        }
        divMoviesContent += '</div>';
        // }
        cont++;

    }


    $('#movies').append(divMoviesContent);
}

async function displayCharacter(idDiv, url) {
    $('#loading').show();
    console.log('id:', idDiv);
    console.log('url:', url);

    if ($('#' + idDiv).css("display") === 'block') {
        $('#' + idDiv).css("display", "none");
    } else {
        const myCharacterData = await fetch(url);
        const myCharacter = await myCharacterData.json();

        $('#' + idDiv).empty();
        $('#' + idDiv).css("display", "block");

        let divContent = '';
        divContent += `<p>height: ${myCharacter.height}</p>`;
        divContent += `<p>mass: ${myCharacter.mass}</p>`;
        divContent += `<p>hair_color: ${myCharacter.hair_color}</p>`;
        divContent += `<p>skin_color: ${myCharacter.skin_color}</p>`;
        divContent += `<p>eye_color: ${myCharacter.eye_color}</p>`;
        divContent += `<p>birth_year: ${myCharacter.birth_year}</p>`;
        divContent += `<p>gender: ${myCharacter.gender}</p>`;
        $('#' + idDiv).append(divContent);
    }
    $('#loading').hide();
}