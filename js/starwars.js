// const loadMoviesAndCharacters = () =>{
//     return new Promise((resolve, reject) =>{
//         fetch('https://swapi.dev/api/films/');
//     });
// };

const getMoviesInfo = async () => {
    const myMoviesData = await fetch('https://swapi.dev/api/films/');
    const myMovies = await myMoviesData.json();
    await paintMoviesOnDiv(myMovies);
};

getMoviesInfo();

async function paintMoviesOnDiv(myMovies) {
    $('#movies').empty();

    let divMoviesContent = '';
    for (const movie of myMovies.results) {
        divMoviesContent += '<div class="movie">'
        divMoviesContent += `<h2>${movie.title}</h2>`;
        for (const character of movie.characters) {
            
            const myCharacterData = await fetch(character);
            const myCharacter = await myCharacterData.json();
            divMoviesContent += `<p>${myCharacter.name}</p>`;
        }
        divMoviesContent += '</div>';
    }


    $('#movies').append(divMoviesContent);
}