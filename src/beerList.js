import refs from "./refs.js";

export function getAllBeer(allBeer) {
    const markup = allBeer.reduce((acc, beer) => {
        acc += `<div class="beer">
     <div class="beerImg"><img src="${beer.image_url}" /></div>
     <div class="beerText">
     <div class="beerTitle">${beer.name}</div>
     <div class="beerDescription">${beer.description}</div>
     </div>
     </div>
     `;
        return acc;
    }, '');

    return refs.beerContainer.insertAdjacentHTML('beforeend', markup);
}

export function emptyBeerList() {
    const markup = `
    <p class="emptyProperties">There were no properties found for
    the given location.</p>
    ` 
    return refs.beerContainer.insertAdjacentHTML('beforeend', markup);
}