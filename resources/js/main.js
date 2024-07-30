import { generateMovie } from "./movie.js";
import { handleSearch } from "./search.js";

const header = document.querySelector(".header");
const searchSection = document.querySelector(".search-section");
const contentTop = searchSection.getBoundingClientRect().bottom + window.scrollY - 230;

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
generateMovie();

// 영화 검색
handleSearch();
