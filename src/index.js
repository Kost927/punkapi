import api from "./api.js";
import refs from "./refs.js";
import { getAllBeer, emptyBeerList } from "./beerList.js";
import LoadMoreBtn from "./loadMoreBtn.js";
import { storage } from "./storage.js";
import { DATA_ACTION_LOAD_MORE } from "./constants.js";

export let allBeerArray = [];

const loadMoreBtn = new LoadMoreBtn({
  selector: DATA_ACTION_LOAD_MORE,
  hidden: true
});

refs.searchBtn.addEventListener("click", searchFormOnClickHandler);
refs.searchForm.addEventListener("keyup", ({ key }) => {
  if (key === "Enter") {
    searchFormOnClickHandler();
  }
});

loadMoreBtn.refs.button.addEventListener("click", () => fetchBeer(false));

export function searchFormOnClickHandler(isClear = false) {
  api.query = refs.searchForm.value;

  refs.searchForm.value >= 1;
  if (refs.searchForm.value.length > 0) {
    storage.addRecent(refs.searchForm.value);
  }
  clearArticlesContainer();
  api.resetPage();
  fetchBeer(isClear);
  refs.searchForm.value = "";
}

export function fetchBeer(isClear = false) {
  loadMoreBtn.disable();

  api.fetchBeer().then(allBeer => {
    if (allBeer.length >= 1) {
      getAllBeer(allBeer, isClear);
      allBeerArray = allBeer;
      storage.setAllData(allBeer);
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
