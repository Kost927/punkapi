import refs from "./refs.js";
import { IMAGE_URL } from "./constants.js";

export function getAllBeer(allBeer) {
  const markup = allBeer.reduce((acc, { image_url, name, description, abv, brewers_tips }) => {
    if (!image_url) {
      image_url = IMAGE_URL;
    }
    acc += `<div class="beer">
     <div class="beerImg"><img src="${image_url}" width="150" hight="300" alt="beer picture" /></div>
     <div class="beerText">
     <div class="beerTitle">${name}</div>
     <div class="beerABV">Alcohol (ABV) ${abv}%</div>
     <div class="beerDescription">Description: ${description}</div>
     <div class="beerTips">Some tips: ${brewers_tips}</div>
     </div>
     </div>
     `;
    return acc;
  }, "");

    return (refs.beerContainer.insertAdjacentHTML("beforeend", markup));
}

export function emptyBeerList() {
  const markup = `
    <p class="emptyProperties">There were no properties found for
    the given location.</p>
    `;
  return refs.beerContainer.insertAdjacentHTML("beforeend", markup);
}
