import api from "./api.js";
import refs from "./refs.js";
import { getAllBeer, emptyBeerList } from "./beerList.js";
import LoadMoreBtn from "./loadMoreBtn.js";

export let recentSearchArray = [];

const loadMoreBtn = new LoadMoreBtn({
  selector: 'button[data-action="load-more"]',
  hidden: true
});

refs.searchBtn.addEventListener("click", searchFormOnClickHandler);
refs.searchForm.addEventListener("keyup", ({ key }) => {
  if (key === "Enter") {
    searchFormOnClickHandler(refs.searchForm.value);
  }
});

loadMoreBtn.refs.button.addEventListener("click", fetchBeer);

export function searchFormOnClickHandler() {
  api.query = refs.searchForm.value;

  refs.searchForm.value >= 1;
  if (refs.searchForm.value.length > 0) {
    recentSearchArray.unshift(refs.searchForm.value);
  }
  clearArticlesContainer();
  api.resetPage();
  fetchBeer();
  refs.searchForm.value = "";
}

function fetchBeer() {
  loadMoreBtn.disable();

  api.fetchBeer().then(allBeer => {
    console.log(allBeer);
    if (allBeer.length >= 1) {
      getAllBeer(allBeer);
      loadMoreBtn.show();
      loadMoreBtn.enable();
    } else {
      emptyBeerList(allBeer);
      loadMoreBtn.hide();
    }
  });
}

function clearArticlesContainer() {
  refs.beerContainer.innerHTML = "";
}
