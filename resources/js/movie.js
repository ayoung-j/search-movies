export const generateMovie = async () => {
    const movieItems = document.querySelector(".movie-items");
    const rows = await fetchMovieDate();

    // 영화 리스트
    rows.forEach((row) => {
        let item = createMovieItem(row);
        movieItems.appendChild(item);
    });
    function createMovieItem(row) {
        let item = document.createElement("li");

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
};

async function fetchMovieDate() {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNGU1ODM2ZDQ0ZTllMjc2YTAzYjhiOWRhYzAyMTYxZSIsIm5iZiI6MTcyMTkwNzYxMC44MDY0MzYsInN1YiI6IjY2YTIzN2I5NTU3ZDEyMmU4NTE4ZWI5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-NlmdkNXnWDlbn_ETvOGdOKADtGTHKfFXTIIsSVfg0M",
        },
    };

    const response = await fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&append_to_response=images&include_image_language=en,null", options);
    const data = await response.json();
    return data.results;
}
