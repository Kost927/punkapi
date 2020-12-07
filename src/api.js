export default {
  searchQuery: "",
  page: 1,
  perPage: 5,
  fetchBeer() {
    const url = `https://api.punkapi.com/v2/beers?page=${this.page}&per_page=${this.perPage}&beer_name=${this.searchQuery}`;

    return fetch(url)
      .then(res => res.json())
      .then(allBeer => {
        this.incrementPage();

        return allBeer;
      });
  },
  resetPage() {
    this.page = 1;
  },
  incrementPage() {
    this.page += 1;
  },
  get query() {
    return this.searchQuery;
  },
  set query(value) {
    this.searchQuery = value;
  }
};
