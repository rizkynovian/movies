import "./style/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-loader";

(() => {
  "use strict";
  document
    .querySelector(".search-button")
    .addEventListener("click", async function () {
      try {
        const i = document.querySelector(".input-keyword");
        !(function (t) {
          let i = "";
          t.forEach(
            (t) =>
              (i += (function (t) {
                return `<div class="col-md-4 my-3">\n                <div class="card">\n                    <img class="card-img-top" src="${t.Poster}">\n                    <div class="card-body">\n                    <h5 class="card-title">${t.Title}</h5>\n                    <h6 class="card-subtitle mb-2 text-muted">${t.Year}</h6>\n                    <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal" data-target="#movieDetailModalLabel" data-imdbid="${t.imdbID}">Show Details</a>\n                    </div>\n                </div>\n            </div>`;
              })(t))
          ),
            (document.querySelector(".movie-container").innerHTML = i);
        })(
          await ((t = i.value),
          fetch("http://www.omdbapi.com/?apikey=b692a87f&s=" + t)
            .then((t) => {
              if (!t.ok) throw new Error(t.statusText);
              return t.json();
            })
            .then((t) => {
              if ("False" === t.Response) throw new Error(t.Error);
              return t.Search;
            }))
        );
      } catch (t) {
        alert(t);
      }
      var t;
    }),
    document.addEventListener("click", async function (t) {
      t.target.classList.contains("modal-detail-button") &&
        (t.target.dataset.imdbid,
        (function (t) {
          const i = (function (t) {
            return `<div class="container-fluid">\n                <div class="row">\n                    <div class="col-md-3">\n                        <img src="${t.Poster}" class="img-fluid">\n                    </div>\n                    <div class="col-md">\n                    <ul class="list-group">\n                        <li class="list-group-item"><h4>${t.Title} ${t.Year}</h4></li>\n                        <li class="list-group-item"><strong>Director:</strong> ${t.Director}</li>\n                        <li class="list-group-item"><strong>Actors:</strong> ${t.Actors}</li>\n                        <li class="list-group-item"><strong>Writer:</strong> ${t.Writer}</li>\n                        <li class="list-group-item"><strong>Plot:</strong><br>${t.Plot}</li>\n                        </ul>\n                    </div>\n                </div>\n            </div>`;
          })(t);
          document.querySelector(".modal-body").innerHTML = i;
        })(
          await fetch("http://www.omdbapi.com/?apikey=b692a87f&i=" + id)
            .then((t) => t.json())
            .then((t) => t)
        ));
    });
})();
