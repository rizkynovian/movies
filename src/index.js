// Import CSS files
import "./style/style.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Import JS files
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-loader";

import './script/app-bar.js';

(() => {
  "use strict";

  const searchButton = document.querySelector(".search-button");
  const inputKeyword = document.querySelector(".input-keyword");
  const movieContainer = document.querySelector(".movie-container");

  const getMovies = async (keyword) => {
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=e1e11978&s=${keyword}`
      );
      if (!response.ok) throw new Error(response.statusText);
      const data = await response.json();
      if (data.Response === "False") throw new Error(data.Error);
      return data.Search;
    } catch (error) {
      alert(error);
    }
  };

  const showMovies = (movies) => {
    let movieCard = "";
    movies.forEach(
      (movie) =>
        (movieCard += `<div class="col-md-3 my-3"> <div class="card"> 
                        <img class="card-img-top" src="${movie.Poster}"> 
                          <div class="card-body"> <h5 class="card-title">${movie.Title}</h5> 
                            <h6 class="card-subtitle mb-2 text-muted">${movie.Year}</h6> 
                          </div>
                          <div class="card-footer">
                            <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal" data-target="#movieDetailModalLabel" data-imdbid="${movie.imdbID}">Show Details</a>
                          </div> 
                        </div> 
                      </div>`)
    );
    movieContainer.innerHTML = movieCard;
  };

  searchButton.addEventListener("click", async () => {
    const keyword = inputKeyword.value;
    const movies = await getMovies(keyword);
    showMovies(movies);
  });

  document.addEventListener("click", async (event) => {
    if (event.target.classList.contains("modal-detail-button")) {
      const imdbId = event.target.dataset.imdbid;
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=e1e11978&i=${imdbId}`
      );
      const movieData = await response.json();
      const movieDetails = `<div class="container-fluid"> 
                              <div class="row"> <div class="col-md-3"> 
                                <img src="${movieData.Poster}" class="img-fluid"> 
                              </div> 
                                <div class="col-md"> 
                                  <ul class="list-group"> 
                                    <li class="list-group-item"><h4>${movieData.Title} ${movieData.Year}</h4></li> 
                                    <li class="list-group-item"><strong>Director:</strong> ${movieData.Director}</li> 
                                    <li class="list-group-item"><strong>Actors:</strong> ${movieData.Actors}</li> 
                                    <li class="list-group-item"><strong>Writer:</strong> ${movieData.Writer}</li> 
                                    <li class="list-group-item"><strong>Plot:</strong><br>${movieData.Plot}</li> 
                                  </ul> 
                                </div> 
                              </div> 
                            </div>`;
      document.querySelector(".modal-body").innerHTML = movieDetails;
    }
  });
})();

if (process.env.NODE_ENV !== "production") {
  console.log("Looks like we are in development mode!");
} else {
  console.log("Looks like we are in production mode!");
}
