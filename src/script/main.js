// Import our custom CSS
import '../style/style.css'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

const main = () =>{
   const searchButton = document.querySelector('.search-button');
   searchButton.addEventListener('click', async () => {
    try{ 
        const inputKeyword = document.querySelector('.input-keyword');
        const movies = await getMovies(inputKeyword.value);
        updateMvs(movies);
    } catch(err) {
        alert(err);
    }
});

// ketika tombol detail diklik
const klikButton = document.addEventListener('click', async (e) => {
    if (e.target.classList.contains('modal-detail-button')) {
        const imdbid = e.target.dataset.imdbid;
        const movieDetail = await getMovieDetail(imdbid);
        updateDetail(movieDetail);
    }
});

const getMovies =  (keyword) => {
    return fetch(`http://www.omdbapi.com/?apikey=e1e11978&s=${keyword}`)
    .then(response => {
        if(!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json()
    })
    .then(response => {
        if(response.Response === "False") {
            throw new Error(response.Error);
        }
        return response.Search;
    });
}

const updateMvs = (movies) => {
    let cards = '';
    movies.forEach(mvs => cards += movieListSearch(mvs));
    const movieContainer = document.querySelector('.movie-container');
    movieContainer.innerHTML = cards;
}

const getMovieDetail = (id) => {
    return fetch(`http://www.omdbapi.com/?apikey=e1e11978&i=${id}`)
        .then(response => response.json())
        .then(mvs => mvs);
}

const updateDetail = (mvs) => {
    const movieDetail = movieDetails(mvs);
    const modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = movieDetail;
}

const movieListSearch = (mvs) => {
    return `<div class="col-md-4 my-3">
                <div class="card">
                    <img class="card-img-top" src="${mvs.Poster}">
                    <div class="card-body">
                    <h5 class="card-title"><strong>${mvs.Title}</strong></h5>
                    <h6 class="card-subtitle mb-2 text-muted">${mvs.Year}</h6>
                    <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal" data-target="#movieDetailModalLabel" data-imdbid="${mvs.imdbID}">Show Details</a>
                    </div>
                </div>
            </div>`;
}

const movieDetails = (mvs) => {
    return `<div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${mvs.Poster}" class="img-fluid">
                    </div>
                    <div class="col-md">
                    <ul class="list-group">
                        <li class="list-group-item"><strong><h4>${mvs.Title} ${mvs.Year}</strong></h4></li>
                        <li class="list-group-item"><strong>Director:</strong> ${mvs.Director}</li>
                        <li class="list-group-item"><strong>Actors:</strong> ${mvs.Actors}</li>
                        <li class="list-group-item"><strong>Writer:</strong> ${mvs.Writer}</li>
                        <li class="list-group-item"><strong>Plot:</strong><br>${mvs.Plot}</li>
                        </ul>
                    </div>
                </div>
            </div>`;
} 
}

export default main;