import refs from "./refs.js";
import { storage } from "./storage.js";
import {
  FAVORITES_COUNT__CLASS,
  ADD_TO_FAVORITE_BTN__CLASS,
  ADD_TO_FAVORITE_BTN_ADDED__CLASS,
  DOT_ADD_TO_FAVORITE_BTN__CLASS,
  REMOVE,
  REMOVE_MODE,
  ADD_MODE,
  ADD_TO_FAVORITE__TEXT,
  DISABLED,
  REMOVE_TO_FAVORITES_BTN__CLASS,
  EMPTY_MODAL__TEXT
} from "./constants.js";

const favoritesCount = document.querySelector(FAVORITES_COUNT__CLASS);

let favoriteClicks = storage.storageSize();

favoritesCount.innerHTML = favoriteClicks;
removeDisable();

refs.beerContainer.addEventListener("click", ({ target }) => {
  toggleBtn(target);
  countFavorites(target);
  removeDisable();
});

function toggleBtn(target) {
  if (target.classList.contains(ADD_TO_FAVORITE_BTN__CLASS)) {
    target.classList.toggle(ADD_TO_FAVORITE_BTN_ADDED__CLASS);
    target.textContent = REMOVE;
    target.dataset.mode = ADD_MODE;

    if (!target.classList.contains(ADD_TO_FAVORITE_BTN_ADDED__CLASS)) {
      target.textContent = ADD_TO_FAVORITE__TEXT;
      target.dataset.mode = REMOVE_MODE;
      storage.remove(target.dataset.id);
    }
  }
}

function countFavorites(target) {
  if (target.classList.contains(ADD_TO_FAVORITE_BTN_ADDED__CLASS) && target.classList.contains(ADD_TO_FAVORITE_BTN__CLASS)) {
    favoriteClicks += 1;
  }
  if (!target.classList.contains(ADD_TO_FAVORITE_BTN_ADDED__CLASS) && target.classList.contains(ADD_TO_FAVORITE_BTN__CLASS)) {
    favoriteClicks -= 1;
  }
  favoritesCount.innerHTML = favoriteClicks;
}

function removeDisable() {
  favoritesCount.textContent > 0
    ? refs.favoritesBtn.removeAttribute(DISABLED)
    : refs.favoritesBtn.setAttribute(DISABLED, DISABLED);
}

refs.beerContainer.addEventListener("click", ({ target }) => {
  if (target.dataset.mode === ADD_MODE) {
    storage.add(+target.dataset.id);
  }
});

refs.modalWrapper.addEventListener("click", ({ target }) => {
  if (target.classList.contains(REMOVE_TO_FAVORITES_BTN__CLASS)) {
    const currBtn = target.parentNode.parentNode,
      modal = currBtn.parentNode;
    storage.remove(target.dataset.id);
    currBtn.remove();
    favoriteClicks -= 1;

    if (!favoriteClicks) {
      modal.innerHTML = EMPTY_MODAL__TEXT;
    }
  } else if (target.dataset.mode === REMOVE_MODE) {
    storage.remove(+target.dataset.id);
    favoriteClicks -= 1;
  } else if (target.dataset.mode === ADD_MODE) {
    storage.add(+target.dataset.id);
    favoriteClicks += 1;
  }
  favoritesCount.innerHTML = favoriteClicks;
  removeDisable();
  let addToFavoriteBtn = document.querySelectorAll(DOT_ADD_TO_FAVORITE_BTN__CLASS);
  [...addToFavoriteBtn].forEach(el => {
    if (target.dataset.id === el.dataset.id) {
      el.classList.toggle(ADD_TO_FAVORITE_BTN_ADDED__CLASS);
      if (el.classList.contains(ADD_TO_FAVORITE_BTN_ADDED__CLASS)) {
        el.textContent = REMOVE;
        el.dataset.mode = REMOVE_MODE;
      } else {
        el.textContent = ADD_TO_FAVORITE__TEXT;
        el.dataset.mode = ADD_MODE;
      }
    }
  });
});
