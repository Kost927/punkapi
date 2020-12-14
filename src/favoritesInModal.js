import refs from "./refs.js";
import { modalModule } from "./popUp.js";
import { storage } from "./storage.js";
import { IMAGE_URL } from "./constants.js";

refs.favoritesBtn.addEventListener("click", product);

function product() {
  let itemsArray = Object.values(storage.data);
  function addBeerModalMarkup() {
    let markup = "";

    itemsArray.map(({ image_url, name, abv, description, brewers_tips, id }) => {
      if (!image_url) {
        image_url = IMAGE_URL;
      }

      markup += `<div class="beer">
     <div class="beerImg"><img src="${image_url}" width="150" hight="300" alt="beer picture" /></div>
     <div class="beerText">
     <div class="beerTitle">${name}</div>
     <div class="beerABV">Alcohol (ABV) ${abv}%</div>
     <div class="beerDescription">Description: ${description}</div>
     <div class="beerTips">Some tips: ${brewers_tips}</div>
     <button type="button" class="removeFromFavoritesBtn" data-id=${id}>Remove from favorites</button>
     </div>
     </div>
     `;
    });
    return markup;
  }
  modalModule(addBeerModalMarkup);
}
