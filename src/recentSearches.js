import refs from "./refs.js";
import { recentSearchArray, searchFormOnClickHandler } from "./index.js";

const dropdownWrapper = document.querySelector(".dropdown");
dropdownWrapper.innerHTML = `
            <div class="dropdownContent"></div>
`;

const dropdownContent = document.querySelector(".dropdownContent");

refs.searchForm.addEventListener("focus", getRecentSearchDropdown);

function getRecentSearchDropdown() {
  dropdownContent.classList.add("show");
  dropdownFunction();
}

document.addEventListener("click", ({ target }) => {
  if (!refs.searchForm.contains(target)) {
    dropdownContent.classList.remove("show");
    dropdownContent.innerHTML = "";
  }
});

function dropdownFunction() {
  const uniqueRecentSearchArray = [...new Set(recentSearchArray)];
  const markup = uniqueRecentSearchArray.reduce((acc, recentSearchItem) => {
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
        searchFormOnClickHandler();
      }
    });
  }

  dropdownContent.innerHTML += markup;
}
