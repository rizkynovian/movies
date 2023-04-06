import "./style/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-loader";

// (() => {
//   "use strict";
//   document
//     .querySelector(".search-button")
//     .addEventListener("click", async function () {
//       try {
//         const i = document.querySelector(".input-keyword");
//         !(function (t) {
//           let i = "";
//           t.forEach(
//             (t) =>
//               (i += (function (t) {
//                 return `<div class="col-md-4 my-3">\n                <div class="card">\n                    <img class="card-img-top" src="${t.Poster}">\n                    <div class="card-body">\n                    <h5 class="card-title">${t.Title}</h5>\n                    <h6 class="card-subtitle mb-2 text-muted">${t.Year}</h6>\n                    <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal" data-target="#movieDetailModalLabel" data-imdbid="${t.imdbID}">Show Details</a>\n                    </div>\n                </div>\n            </div>`;
//               })(t))
//           ),
//             (document.querySelector(".movie-container").innerHTML = i);
//         })(
//           await ((t = i.value),
//           fetch("http://www.omdbapi.com/?apikey=b692a87f&s=" + t)
//             .then((t) => {
//               if (!t.ok) throw new Error(t.statusText);
//               return t.json();
//             })
//             .then((t) => {
//               if ("False" === t.Response) throw new Error(t.Error);
//               return t.Search;
//             }))
//         );
//       } catch (t) {
//         alert(t);
//       }
//       var t;
//     }),
//     document.addEventListener("click", async function (event) {
//       if (event.target.classList.contains("modal-detail-button")) {
//         const imdbId = event.target.dataset.imdbid;
//         const movieData = await fetch(
//           `http://www.omdbapi.com/?apikey=b692a87f&i=${imdbId}`
//         )
//           .then((response) => response.json())
//           .then((data) => data);
//         const movieDetails = `<div class="container-fluid"> <div class="row"> <div class="col-md-3"> <img src="${movieData.Poster}" class="img-fluid"> </div> <div class="col-md"> <ul class="list-group"> <li class="list-group-item"><h4>${movieData.Title} ${movieData.Year}</h4></li> <li class="list-group-item"><strong>Director:</strong> ${movieData.Director}</li> <li class="list-group-item"><strong>Actors:</strong> ${movieData.Actors}</li> <li class="list-group-item"><strong>Writer:</strong> ${movieData.Writer}</li> <li class="list-group-item"><strong>Plot:</strong><br>${movieData.Plot}</li> </ul> </div> </div> </div>`;
//         document.querySelector(".modal-body").innerHTML = movieDetails;
//       }
//     });
// })();

(() => {
  "use strict";

  const searchButton = document.querySelector(".search-button");
  const inputKeyword = document.querySelector(".input-keyword");
  const movieContainer = document.querySelector(".movie-container");

  const getMovies = async (keyword) => {
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=b692a87f&s=${keyword}`
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
        (movieCard += `<div class="col-md-4 my-3"> <div class="card"> <img class="card-img-top" src="${movie.Poster}"> <div class="card-body"> <h5 class="card-title">${movie.Title}</h5> <h6 class="card-subtitle mb-2 text-muted">${movie.Year}</h6> <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal" data-target="#movieDetailModalLabel" data-imdbid="${movie.imdbID}">Show Details</a> </div> </div> </div>`)
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
        `http://www.omdbapi.com/?apikey=b692a87f&i=${imdbId}`
      );
      const movieData = await response.json();
      const movieDetails = `<div class="container-fluid"> <div class="row"> <div class="col-md-3"> <img src="${movieData.Poster}" class="img-fluid"> </div> <div class="col-md"> <ul class="list-group"> <li class="list-group-item"><h4>${movieData.Title} ${movieData.Year}</h4></li> <li class="list-group-item"><strong>Director:</strong> ${movieData.Director}</li> <li class="list-group-item"><strong>Actors:</strong> ${movieData.Actors}</li> <li class="list-group-item"><strong>Writer:</strong> ${movieData.Writer}</li> <li class="list-group-item"><strong>Plot:</strong><br>${movieData.Plot}</li> </ul> </div> </div> </div>`;
      document.querySelector(".modal-body").innerHTML = movieDetails;
    }
  });
})();
