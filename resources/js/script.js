const header = document.querySelector(".header");
const searchSection = document.querySelector(".search-section");
const movieItems = document.querySelector(".movie-items");
const searchInput = document.querySelectorAll(".search__input");
const headerSearchInput = document.querySelector("#header-search-input");
const mainSearchInput = document.querySelector("#main-search-input");
const searchBtn = document.querySelectorAll(".search__btn");
const listSectionContainer = document.querySelector(".list-section .container");
const contentTop = searchSection.getBoundingClientRect().bottom + window.scrollY - 230;

const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNGU1ODM2ZDQ0ZTllMjc2YTAzYjhiOWRhYzAyMTYxZSIsIm5iZiI6MTcyMTkwNzYxMC44MDY0MzYsInN1YiI6IjY2YTIzN2I5NTU3ZDEyMmU4NTE4ZWI5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-NlmdkNXnWDlbn_ETvOGdOKADtGTHKfFXTIIsSVfg0M",
    },
};

fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&append_to_response=images&include_image_language=en,null", options)
    .then((response) => response.json())
    // .then((response) => console.log(response))
    .then((data) => {
        let rows = data.results;

        rows.forEach((row) => {
            // 영화 리스트
            const item = createMovieItem(row);
            movieItems.appendChild(item);
        });
    })
    .catch((err) => console.error(err));

// 헤더
window.addEventListener("scroll", function () {
    headerScroll();
});

function headerScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop >= contentTop) {
        header.classList.add("scroll-active");
    } else {
        header.classList.remove("scroll-active");
    }
}

// 영화 리스트
function createMovieItem(row) {
    const item = document.createElement("li");

    item.className = "movie-item";
    item.innerHTML = `
        <div class="movie-item__img" style="background-image:url(https://image.tmdb.org/t/p/w500${row.poster_path})"></div>
        <div class="movie-item__con">
            <div class="movie-item__tit">${row.title}</div>
            <div class="movie-item__info">
                <div class="movie-item__rating">
                    <span class="material-symbols-rounded primary-color"> kid_star </span>
                    ${row.vote_average}
                </div>
                <span class="movie-item__date">${row.release_date}</span>
            </div>
            <div class="movie-item__txt">${row.overview}</div>
        </div>
    `;
    // 해당 아이템은 이 시점부터 click 이벤트를 가지고 있습니다. 즉, 이 카드를 DOM 에 붙여넣어도 이벤트가 작동을 합니다.
    item.addEventListener("click", () => alert(`"${row.title}"의 ID는 ${row.id}입니다.`));

    return item;
}

// 영화 검색
function searchMovie(query) {
    const movieItem = [...document.querySelectorAll(".movie-item")];
    movieItem.map(function (item) {
        const title = item.querySelector(".movie-item__tit").textContent.toLowerCase();
        if (title.includes(query)) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });

    // 포커스
    mainSearchInput.focus();
    // 값 이동
    let headerSearchInputValue = headerSearchInput.value;
    if (headerSearchInputValue !== "") {
        mainSearchInput.value = headerSearchInputValue;
        headerSearchInput.value = "";
    }
}
// 영화 검색 - 엔터키 이벤트
searchInput.forEach((element) => {
    element.addEventListener("keydown", (e) => {
        if (e.keyCode === 13 && element.value !== "") {
            searchMovieEnter(element);
        }
    });
});
function searchMovieEnter(element) {
    const query = element.value.toLowerCase();
    searchMovie(query);
}
// 영화 검색 - 버튼 이벤트
searchBtn.forEach((element) => {
    if (!element) {
        element.previousElementSibling.value = "";
    }
    element.addEventListener("click", () => {
        searchMovieBtn(element);
    });
});
function searchMovieBtn(element) {
    const query = element.previousElementSibling.value.toLowerCase();
    searchMovie(query);
}
