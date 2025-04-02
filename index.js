const arrows = document.querySelectorAll(".arrow");
const movieLists = document.querySelectorAll(".movie-list");

arrows.forEach((arrow, i) => {
  const itemNumber = movieLists[i].querySelectorAll("img").length;
  let clickCounter = 0;
  arrow.addEventListener("click", () => {
    const ratio = Math.floor(window.innerWidth / 270);
    clickCounter++;
    if (itemNumber - (4 + clickCounter) + (4 - ratio) >= 0) {
      movieLists[i].style.transform = `translateX(${
        movieLists[i].computedStyleMap().get("transform")[0].x.value - 300
      }px)`;
    } else {
      movieLists[i].style.transform = "translateX(0)";
      clickCounter = 0;
    }
  });

  console.log(Math.floor(window.innerWidth / 270));
});

//TOGGLE

const ball = document.querySelector(".toggle-ball");
const items = document.querySelectorAll(
  ".container,.movie-list-title,.navbar-container,.sidebar,.left-menu-icon,.toggle"
);

ball.addEventListener("click", () => {
  items.forEach((item) => {
    item.classList.toggle("active");
  });
  ball.classList.toggle("active");
});

//info

const apiKey = "46824a81";  // Replace with your OMDb API Key
const searchInput = document.getElementById("search-bar");
const searchButton = document.getElementById("search-btn");
const movieContainer = document.getElementById("movie-info");

searchButton.addEventListener("click", () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        fetchMovieDetails(searchTerm);
    }
});

async function fetchMovieDetails(movieName) {
    const apiUrl = `https://www.omdbapi.com/?t=${encodeURIComponent(movieName)}&apikey=${apiKey}`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.Response === "True") {
            displayMovieInfo(data);
        } else {
            movieContainer.innerHTML = `<p>Movie not found. Try another one!</p>`;
        }
    } catch (error) {
        console.error("Error fetching movie data:", error);
        movieContainer.innerHTML = `<p>Failed to load movie details.</p>`;
    }
}

function displayMovieInfo(data) {
  const movieContainer = document.getElementById("movie-container");
  movieContainer.classList.add("active");

  movieContainer.innerHTML = `
  <br> <br> <br> <br> <br> <br> <br> <br> <br> <br>
   <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br><br><br><br>
      <h2>${data.Title} (${data.Year})</h2>
      <img src="${data.Poster}" alt="${data.Title}">
      <p class="imdb-rating"><strong>IMDb Rating:</strong> ${data.imdbRating}</p>
      <p class="genre"><strong>Genre:</strong> ${data.Genre}</p>
      <p class="director"><strong>Director:</strong> ${data.Director}</p>
      <p class="cast"><strong>Cast:</strong> ${data.Actors}</p>
      <p class="plot"><strong>Plot:</strong> ${data.Plot}</p>
  `;
}







