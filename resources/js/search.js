export const handleSearch = async () => {
    const headerSearchInput = document.querySelector("#header-search-input");
    const mainSearchInput = document.querySelector("#main-search-input");
    const searchInput = document.querySelectorAll(".search__input");
    const searchBtn = document.querySelectorAll(".search__btn");
    const mainSearchInputTop = mainSearchInput.offsetTop - 100;

    // 영화 검색 - 엔터키 이벤트
    searchInput.forEach((element) => {
        element.addEventListener("keydown", (event) => {
            if (event.keyCode === 13 && element.value !== "") {
                // 발생한 이벤트에 대한 브라우저의 기본 동작(새로고침)을 막습니다.
                event.preventDefault();
                searchMovieEnter(element);
            }
        });
    });
    function searchMovieEnter(element) {
        const inputValue = element.value.toLowerCase();
        searchMovie(inputValue);
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
        const inputValue = element.previousElementSibling.value.toLowerCase();
        searchMovie(inputValue);
    }

    // 영화 검색
    function searchMovie(inputValue) {
        const movieItem = [...document.querySelectorAll(".movie-item")];
        movieItem.map(function (item) {
            const title = item.querySelector(".movie-item__tit").textContent.toLowerCase();
            if (title.includes(inputValue)) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });

        // input value 이동
        let headerSearchInputValue = headerSearchInput.value;
        if (headerSearchInputValue !== "") {
            mainSearchInput.value = headerSearchInputValue;
            headerSearchInput.value = "";
        }

        // 상단으로 스크롤 이동
        window.scrollTo(0, mainSearchInputTop);
        console.log(mainSearchInputTop);
    }

    // input 포커스
    mainSearchInput.focus();
};
