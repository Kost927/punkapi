class Storage {
  constructor(name = "favoriteBeer", resentSearch = "recentSearch", storage = localStorage) {
    this.name = name;
    this.allData = [];
    this.resentSearch = resentSearch;
    this.storage = storage;
    this.data = this.getElements();
    this.recentData = this.getResentElements();
  }
  getElements() {
    let values = this.storage.getItem(this.name);
    if (!values) values = {};
    else values = JSON.parse(values);
    return values;
  }

  getResentElements() {
    let values = this.storage.getItem(this.resentSearch);
    if (!values) values = [];
    else values = JSON.parse(values);
    return values;
  }

  add(key) {
    for (let item of this.allData) {
      if (item.id === key) {
        this.data[key] = item;
        this.storage.setItem(this.name, JSON.stringify(this.data));
        break;
      }
    }
  }

  addRecent(value) {
    if (!this.recentData.includes(value)) {
      this.recentData.push(value);
      this.storage.setItem(this.resentSearch, JSON.stringify(this.recentData));
    }
  }

  remove(key) {
    delete this.data[key];
    this.storage.setItem(this.name, JSON.stringify(this.data));
  }

  storageSize() {
    return Object.keys(this.data).length;
  }

  has(key) {
    return key in this.data;
  }

  setAllData(data) {
    this.allData = data;
  }
}

export const storage = new Storage();
