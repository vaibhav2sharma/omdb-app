const API_KEY = "25ce5951";
const moviesPerPage = 3;
let allMovies = [];
let currentPage = 1;

function searchMovies() {
  const query = document.getElementById("searchInput").value;
  if (!query) return;
  fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=25ce5951&s=${query}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.Response === "True") {
        allMovies = data.Search;
        currentPage = 1;
        renderMovies();
        renderPagination();
        renderDropdown();
      } else {
        document.getElementById("moviesContainer").innerHTML =
          '<img src="assets/no-results.gif" alt="No results" width="300"/>';
        document.getElementById("pagination").innerHTML = "";
        document.getElementById("dropdownContainer").innerHTML = "";
      }
    });
}

function renderMovies() {
  const container = document.getElementById("moviesContainer");
  container.innerHTML = "";
  const start = (currentPage - 1) * moviesPerPage;
  const end = start + moviesPerPage;
  const moviesToShow = allMovies.slice(start, end);
  moviesToShow.forEach((movie) => {
    const movieEl = document.createElement("div");
    movieEl.className = "movie";
    movieEl.innerHTML = `
      <img src="${
        movie.Poster !== "N/A"
          ? movie.Poster
          : "https://via.placeholder.com/250x350"
      }" alt="${movie.Title}" />
      <h3>${movie.Title}</h3>
      <p>${movie.Year}</p>
    `;
    container.appendChild(movieEl);
  });
}

function renderPagination() {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";
  const totalPages = Math.ceil(allMovies.length / moviesPerPage);
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === currentPage) btn.classList.add("active");
    btn.onclick = () => {
      currentPage = i;
      renderMovies();
      renderPagination();
      renderDropdown();
    };
    pagination.appendChild(btn);
  }
}

function renderDropdown() {
  const dropdownContainer = document.getElementById("dropdownContainer");
  dropdownContainer.innerHTML = "";
  const totalPages = Math.ceil(allMovies.length / moviesPerPage);
  if (totalPages <= 1) return;
  const select = document.createElement("select");
  for (let i = 1; i <= totalPages; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = "Go to page " + i;
    if (i === currentPage) option.selected = true;
    select.appendChild(option);
  }
  select.onchange = (e) => {
    currentPage = parseInt(e.target.value);
    renderMovies();
    renderPagination();
    renderDropdown();
  };
  dropdownContainer.appendChild(select);
}
