import refs from "./refs.js";
import { searchFormOnClickHandler } from "./index.js";
import { storage } from "./storage.js";
import { SHOW } from "./constants.js";

const dropdownWrapper = document.querySelector(".dropdown");

dropdownWrapper.innerHTML = `
            <div class="dropdownContent"></div>
`;

const dropdownContent = document.querySelector(".dropdownContent");

refs.searchForm.addEventListener("mouseenter", () => {
  if (refs.searchForm.value.length >= 1) {
    dropdownContent.classList.remove(SHOW);
  } else {
    dropdownContent.innerHTML = "";
    getRecentSearchDropdown();
  }
});

function getRecentSearchDropdown() {
  dropdownContent.classList.add(SHOW);
  dropdownFunction();
}

document.addEventListener("click", ({ target }) => {
  if (!refs.searchForm.contains(target)) {
    dropdownContent.classList.remove(SHOW);
    dropdownContent.innerHTML = "";
  }
});

function dropdownFunction() {
  const markup = storage.getResentElements().reduce((acc, recentSearchItem) => {
    acc += `
        <p class="recentSearchBtn">${recentSearchItem}</p>
     `;
    return acc;
  }, "");

  if (!markup) {
    return;
  } else {
    dropdownContent.addEventListener("click", ({ target }) => {
      if (target.classList.contains("recentSearchBtn")) {
        refs.searchForm.value = target.textContent;
        searchFormOnClickHandler(true);
      }
    });
  }

  dropdownContent.innerHTML += markup;
}
