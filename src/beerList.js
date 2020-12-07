import refs from "./refs.js";

export function getAllBeer(allBeer) {
  const markup = allBeer.reduce((acc, beer) => {
    if (beer.image_url === null) {
      beer.image_url =
        "https://p7.hiclipart.com/preview/1005/240/954/brewdog-craft-beer-for-the-people-brewdog-craft-beer-for-the-people-ale-punk-ipa-beer-thumbnail.jpg";
    }
    acc += `<div class="beer">
     <div class="beerImg"><img src="${beer.image_url}" width="150" hight="300" alt="beer picture" /></div>
     <div class="beerText">
     <div class="beerTitle">${beer.name}</div>
     <div class="beerDescription">${beer.description}</div>
     </div>
     </div>
     `;
    return acc;
  }, "");

  return refs.beerContainer.insertAdjacentHTML("beforeend", markup);
}

export function emptyBeerList() {
  const markup = `
    <p class="emptyProperties">There were no properties found for
    the given location.</p>
    `;
  return refs.beerContainer.insertAdjacentHTML("beforeend", markup);
}
