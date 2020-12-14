import { IS_HIDDEN } from "./constants.js";

export default class LoadMoreBtn {
    constructor({ selector, hidden = false }) {
        this.refs = this.getRefs(selector);

        hidden && this.hide();
    }

    getRefs(selector) {
        const refs = {};
        refs.button = document.querySelector(selector);
        refs.label = refs.button.querySelector('.label');
        refs.spinner = refs.button.querySelector('.spinner');

        return refs;
    }

    enable() {
        this.refs.button.disabled = false;
        this.refs.label.textContent = 'Load more';
        this.refs.spinner.classList.add(IS_HIDDEN);
    }

    disable() {
        this.refs.button.disabled = true;
        this.refs.label.textContent = 'Loading...';
        this.refs.spinner.classList.remove(IS_HIDDEN);
    }

    show() {
        this.refs.button.classList.remove(IS_HIDDEN);
    }

    hide() {
        this.refs.button.classList.add(IS_HIDDEN);
    }
}