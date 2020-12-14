import refs from "./refs.js";
import {
  IMAGE_URL,
  ADD_TO_FAVORITE_BTN__CLASS,
  ADD_TO_FAVORITE__TEXT,
  REMOVE_MODE,
  REMOVE,
  SPACE_ADD_TO_FAVORITE_BTN_ADDED__CLASS,
  ADD_MODE
} from "./constants.js";
import { storage } from "./storage.js";

export function getAllBeer(allBeer, isClear = false) {
  const markup = allBeer.reduce((acc, { image_url, name, description, abv, brewers_tips, id }) => {
    if (!image_url) {
      image_url = IMAGE_URL;
    }

    let btn = {
      className: ADD_TO_FAVORITE_BTN__CLASS,
      text: ADD_TO_FAVORITE__TEXT,
      mode: ADD_MODE
    };

    if (storage.has(id)) {
      btn.className += SPACE_ADD_TO_FAVORITE_BTN_ADDED__CLASS;
      btn.text = REMOVE;
      btn.mode = REMOVE_MODE;
    }

    acc += `<li class="beer" data-beerid="${id}">
     <div class="beerImg"><img src="${image_url}" width="150" hight="300" alt="beer picture" /></div>
     <div class="beerText">
     <div class="beerTitle" data-titleid="${id}">${name}</div>
     <div class="beerABV">Alcohol (ABV) ${abv}%</div>
     <div class="beerDescription">Description: ${description}</div>
     <div class="beerTips">Some tips: ${brewers_tips}</div>
     <button type="button" class="${btn.className}" data-id="${id}" data-mode="${btn.mode}">${btn.text}</button>
     </div>
     </li>
     `;
    return acc;
  }, "");
  if (isClear) refs.beerContainer.innerHTML = "";

  return refs.beerContainer.insertAdjacentHTML("beforeend", markup);
}

export function emptyBeerList() {
  const markup = `
    <p class="emptyProperties">There were no properties found for
    the given location.</p>
    `;
  return refs.beerContainer.insertAdjacentHTML("beforeend", markup);
}
