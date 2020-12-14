import refs from "./refs.js";
import { modalModule } from "./popUp.js";
import {
  IMAGE_URL,
  ADD_TO_FAVORITE_BTN__CLASS,
  ADD_TO_FAVORITE__TEXT,
  ADD_MODE,
  SPACE_ADD_TO_FAVORITE_BTN_ADDED__CLASS,
  REMOVE,
  REMOVE_MODE
} from "./constants.js";
import { allBeerArray } from "./index.js";
import { storage } from "./storage.js";

refs.beerContainer.addEventListener("click", singleItemInfo);

function singleItemInfo({ target }) {
  if (target.classList.contains("beerTitle")) {
    const parentLi = target.closest("li");
    const idBeer = parentLi.dataset.beerid;
    function addBeerModalMarkup() {
      let markup = "";

      const { image_url, name, abv, description, brewers_tips } = allBeerArray.find(({ id }) => id === +idBeer);

      if (!image_url) {
        image_url = IMAGE_URL;
      }

      let btn = {
        className: ADD_TO_FAVORITE_BTN__CLASS,
        text: ADD_TO_FAVORITE__TEXT,
        mode: ADD_MODE
      };

      if (storage.has(idBeer)) {
        btn.className += SPACE_ADD_TO_FAVORITE_BTN_ADDED__CLASS;
        btn.text = REMOVE;
        btn.mode = REMOVE_MODE;
      }

      markup = `<div class="beer">
     <div class="beerImg"><img src="${image_url}" width="150" hight="300" alt="beer picture" /></div>
     <div class="beerText">
     <div class="beerTitle">${name}</div>
     <div class="beerABV">Alcohol (ABV) ${abv}%</div>
     <div class="beerDescription">Description: ${description}</div>
     <div class="beerTips">Some tips: ${brewers_tips}</div>
     </div>
     </div>
     <button type="button" class="${btn.className}" data-id="${idBeer}" data-mode="${btn.mode}">${btn.text}</button>
     `;

      return markup;
    }
    modalModule(addBeerModalMarkup);
  }
}
